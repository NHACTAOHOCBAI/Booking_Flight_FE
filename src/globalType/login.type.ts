export {}

declare global {
  interface ILogin {
    data: { accessToken: string; account: IAccountTable }
    message: string
    code: number
  }
}
