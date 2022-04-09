import type { Knex } from "knex";
import knex from "knex";

/**
 * First let's implement just a find method.
 * For that we need an interface that will cover our operations (a.k.a ).
 */
interface Reader<T> {
  find(item: Partial<T>): Promise<Array<T>>;
  findOne(id: string | Partial<T>): Promise<T>;
  exist(id: string | Partial<T>): Promise<boolean>;
}

interface Writer<T> {
  create(item: Omit<T, "id">): Promise<T>;
  createMany(item: Array<Omit<T, "id">>): Promise<Array<T>>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

/**
 * This is our interface for any database dialect repository.
 */
type BaseRepository<T> = Writer<T> & Reader<T>;

/**
 * Here we able to create our database repository
 * In this example we use SQL database with Knex query builder.
 * But if you want to use MongoDB, just replace Knex with MondoDB package
 */
export abstract class KnexRepository<T> implements BaseRepository<T> {
  readonly knex: Knex;
  readonly tableName: string;
  
  constructor(knex: Knex, tableName: string) {
    this.knex = knex;
    this.tableName = tableName;
  }

  get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  //   Warning
  // Don't use arrow functions like this.
  // Because in future it will break overriding methods with super.find() calls.
  // https://stackoverflow.com/questions/46869503/es6-arrow-functions-trigger-super-outside-of-function-or-class-error
  find(item: Partial<T>): Promise<Array<T>> {
    return this.qb.where(item).select();
  }

  findOne(id: string | Partial<T>): Promise<T> {
    return typeof id === "string"
      ? this.qb.where("id", id).first()
      : this.qb.where(id).first();
  }
  async create(item: Omit<T, "id">): Promise<T> {
    const [output] = await this.qb.insert<T>(item).returning("*");
    return output as Promise<T>;
  }
  createMany(items: Array<T>): Promise<Array<T>> {
    return this.qb.insert<T>(items) as Promise<Array<T>>;
  }

  update(id: string, item: Partial<T>): Promise<boolean> {
    return this.qb.where("id", id).update(item);
  }

  delete(id: string): Promise<boolean> {
    return this.qb.where("id", id).del();
  }

  async exist(id: string | Partial<T>) {
    const query = this.qb.select<[{ count: number }]>(
      this.knex.raw("COUNT(*)::integer as count")
    );

    if (typeof id !== "string") {
      query.where(id);
    } else {
      query.where("id", id);
    }

    const exist = await query.first();

    return exist!.count !== 0;
  }
}

/**
 * Now we create the repository to a specific entity.
 */
export interface Product {
  id: string;
  name: string;
  count: number;
  price: number;
}

export class ProductRepository extends KnexRepository<Product> {
  async isOutOfStock(id: string): Promise<boolean> {
    const product = await this.qb.where(id).first("count");

    return product.columns("count") <= 0;
  }
}

/**
 * Let's go use our repository.
 */
const connect = async () => {
  const connection = knex({
    client: "postgres",
    connection: {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "demo",
    },
  });
  // Waiting for a connection to be established
  await connection.raw("SELECT 1");
  return connection;
};

(async () => {
  // connecting to database
  const db = await connect();

  // initializing the repository
  const repository = new ProductRepository(db, "products");

  // call find method from repository
  const product = await repository.findOne({
    name: "laptop",
  });
  console.log(`product ${product}`);

  if (product) {
    const isOutOfStock = await repository.isOutOfStock(product.id);
    console.log(`is ${product.name}'s out of stock ${isOutOfStock}`);
  }
})();
