import { Button, Loader, Table } from "@mantine/core";
import { useAllExpenses } from "../../lib/hooks";
import { IExpenses, RootState } from "../../types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  IconCalendarEvent,
  IconDashboard,
  IconHome,
  IconCash,
  IconCurrencyReal,
} from "@tabler/icons";
import { Create } from "./components";

const Expenses = () => {
  const { token, user } = useSelector((state: RootState) => state.clickState);

  const { data: expenses, isLoading, isError } = useAllExpenses(token);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  const [isOpenCreate, setOpenCreate]= useState(false)

  return (
    <>
      <Button size="md" onClick={()=>setOpenCreate(true)}>Cadastrar</Button>
      <Create isOpen={isOpenCreate} setVisible={()=>setOpenCreate(false)} />
      <br/>
      {isLoading ? (
        <Loader />
      ) : (
        <Table>
          {expenses?.map((chave: IExpenses) => {
            return (
              <tr>
                <td>{chave.title}</td>
                <td>{chave.frequency.frequency}</td>
                <td>
                  {chave.type.type}
                </td>
                <td>
                  <IconCurrencyReal size={16} /> {chave.value.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </Table>
      )}
    </>
  );
};
export default Expenses;
