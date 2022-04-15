// Pick
interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
interface LoginResponseBad {
  id: number;
  name: string;
}
type LogingRespons = Pick<UserProfileResponse, "id" | "name">;

// Lower, Upper case
type Role = "ADMIN" | "USER" | "GUEST";
type LowercaseRoleBad = "admin" | "user" | "guest";
type LowercaseRole = Lowercase<Role>;
type CapitalizeRole = Capitalize<Role>;
type UncapitalizeRole = Uncapitalize<Role>;

// Partial
interface User {
  name: string;
  age: number;
  password: string;
}

interface PartialUserBad {
  name?: string;
  age?: number;
  password?: string;
}
type PartialUser = Partial<User>;

// Readonly
interface UserA {
  role: string;
}

const user_bad: UserA = { role: "ADMIN" };
user_bad.role = "USER";

type ReadonlyUserA = Readonly<UserA>;
const user_readonly: ReadonlyUserA = { role: "ADMIN" };
// user_readonly.role = "USER";

// Record
interface Address {
  street: string;
  pin: number;
}
interface Addresses {
  home: Address;
  office: Address;
}

type AddressesRecord = Record<"home" | "office", Address>;

// Omit
interface Usser {
  name: string;
  age: number;
  password: string;
}

interface UssserPartialBad {
  name: string;
  age: number;
}
type UsserPartial = Omit<User, "password">;

// Exclude, Extract
type Roole = "ADMIN" | "USER" | "GUEST";
type NonAdminRooleBad = "USER" | "GUESt";
type NonAdminRoole = Exclude<Roole, "ADMIN">;
type AdminRoole = Extract<Roole, "ADMIN">;

// NonNullable
type Rooole = "ADMIN" | "USER" | null;
type NonNullableRoooleBad = "ADMIN" | "USER";
type NonNullableRooole = NonNullable<Rooole>;

console.log("hello");
