interface User {
  id: number;
  phoneNumber: string;
  fullName: string;
  address: string;
}

const users: User[] = [
  {
    id: 1,
    phoneNumber: "08100000000",
    fullName: "First User",
    address: "Santa fe, florida",
  },
  {
    id: 2,
    phoneNumber: "08111111111",
    fullName: "Second User",
    address: "San Fransisco, California",
  },
];

function getUser(id: number): User | undefined;
function getUser(phoneNumber: string): User | undefined;
function getUser(address: string, fullName: string): User | undefined;

function getUser(
  idOrPhoneNumber: number | string,
  address?: string
): User | undefined {
  if (typeof idOrPhoneNumber === "string") {
    return users.find((user) => user.phoneNumber === idOrPhoneNumber);
  }

  if (typeof address === "string") {
    return users.find((user) => user.address === address);
  } else {
    return users.find((user) => user.id === idOrPhoneNumber);
  }
}

const userById = getUser(1);
const userByPhoneNumber = getUser("08100000000");
const userByAddress = getUser("San Fransisco, California", "Jon Doe");

