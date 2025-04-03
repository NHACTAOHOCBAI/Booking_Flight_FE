
export { }

declare global {
    interface APIResponse<T> {
        code: number
        message: string
        data?: T[]
    }
}