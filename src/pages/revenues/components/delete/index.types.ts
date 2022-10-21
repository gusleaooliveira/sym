
import { IRevenues } from '../../../../types/IRevenues';
export interface IProps {
    isDeleteRevenue: boolean,
    setDeleteRevenue: () => void,
    item: IRevenues
}