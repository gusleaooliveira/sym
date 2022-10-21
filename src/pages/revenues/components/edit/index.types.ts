import { IRevenues } from "../../../../types/IRevenues";


export interface IProps {
    isEditRevenue: boolean,
    setEditRevenue: () => void,
    item: IRevenues
}