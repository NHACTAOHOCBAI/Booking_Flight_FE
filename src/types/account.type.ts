export interface Account {
  _id: string;
  username: string;
  phone: string;
  fullName: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
  role: string;
}

export type Accounts = Pick<Account, "phone" | "fullName">[];
