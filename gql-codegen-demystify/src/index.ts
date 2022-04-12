export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverTypeWrapper<T> = Promise<T> | T;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  DateTime: any;
};

export type UserProfileInput = {
  userId: Scalars["Int"];
};

export type UserProfile = {
  fname: string;
  lname: string;
  email?: Maybe<Scalars["String"]>;
};

export type UserProfileSuccess = {
  __typename?: "UserProfileSuccess";
  userProfile?: Maybe<UserProfile>;
};

export type UserNotExists = {
  __typename?: "UserNotExists";
  uid?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type UserProfilePayload = UserProfileSuccess | UserNotExists;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversTypes = ResolversObject<{
  Date: Scalars["Date"];
  Time: Scalars["Time"];
  DateTime: Scalars["DateTime"];
  UserNotExists: ResolverTypeWrapper<UserNotExists>;
  UserProfileInput: UserProfileInput;
  UserProfilePayload:
    | ResolversTypes["UserProfileSuccess"]
    | ResolversTypes["UserNotExists"];
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Scalars["Date"];
  Time: Scalars["Time"];
  DateTime: Scalars["DateTime"]; 
  UserNotExists: ResolverTypeWrapper<UserNotExists>;
  UserProfileInput: UserProfileInput;
  UserProfilePayload:
    | ResolversTypes["UserProfileSuccess"]
    | ResolversTypes["UserNotExists"];
  UserProfile: ResolversTypes["UserProfile"];
}>;

