import { ILogin } from './authorization'
import { IActions } from './actions'
import { IExpenses } from './expenses'

export type {
    ILogin,
    IActions,
    IExpenses
}

export interface RootState {
    clickState: IActions;
}