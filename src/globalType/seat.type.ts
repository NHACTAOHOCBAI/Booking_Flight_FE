export { };

declare global {
    interface ISeatTable {
        id: string
        seatCode: string
        price: number
        description: string
    }
}