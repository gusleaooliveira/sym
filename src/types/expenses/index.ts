export interface Type {
    _id: string;
    type: string;
}

export interface Tag {
    _id: string;
    tag: string;
}

export interface Frequency {
    _id: string;
    frequency: string;
}

export interface IExpenses {
    _id: string;
    type: Type;
    tag: Tag;
    data: Date;
    value: number;
    title: string;
    description: string;
    frequency: Frequency;
}
