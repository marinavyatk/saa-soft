export type Account = {
  id: string;
  tags: { text: string }[];
  entryType: "local" | "ldap";
  login: string | null;
  password: string | null;
};

export type Field = "tags" | "login" | "password";

export type Error = string | null;
export type Errors = Record<Field, Error>;
