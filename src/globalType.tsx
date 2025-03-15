export { };

declare global {
    interface IAirportItem {
        _id: string,
        name: string,
        city: string,
        country: string
    }
    interface IAccountItem {
        _id: string,
        username: string,
        phone: string,
        fullName: string,
        dob: string,
        createdAt: string,
        updatedAt: string,
        gender: string,
        role: string,
    }
}