import type { Knex } from "knex";
import knex from "knex";

interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(id: string | Partial<T>): Promise<T>;
}

type BaseRepository<T> = Reader<T>;

export abstract class KnexRepository<T> implements BaseRepository<T> {
  constructor(public readonly knex: Knex, public readonly tableName: string) {}

  public get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  find(item: Partial<T>): Promise<T[]> {
    return this.qb.where(item).select();
  }

  findOne(id: string | Partial<T>): Promise<T> {
    return typeof id === "string"
      ? this.qb.where("id", id).first()
      : this.qb.where(id).first();
  }
}

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
