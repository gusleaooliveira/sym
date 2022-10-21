import { IExpenses } from '../../../../types/IExpenses';
export interface IProps {
    isDeleteExpense: boolean,
    setDeleteExpense: () => void,
    item: IExpenses
}