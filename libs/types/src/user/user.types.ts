export type UserFormValues = {
  name: string;
  age: string;
};

export type User = {
  id: string;
  age: string;
  name: string;
  createdAt: string;
};

export type UserSearchParams = {
  page: number;
  limit: number;
};

export type UserRequest = {
  name: string;
  age: number;
};
