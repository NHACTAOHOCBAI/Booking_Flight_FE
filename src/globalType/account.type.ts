export {}

declare global {
  interface IAccountTable {
    id?: string
    username: string
    password: string
    email: string
    fullName?: string
    phone?: string
    role?: number
  }
}
