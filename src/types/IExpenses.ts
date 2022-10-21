export interface IExpenses {
    _id?: string,
    type: string,
    tag: string[],
    data: Date,
    value: number,
    title: string,
    description: string,
    frequency: string
}