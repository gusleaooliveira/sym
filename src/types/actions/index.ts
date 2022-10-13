export interface IActions { 
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        password: string
    }
}