import { ActionIcon, Button, Loader, Table } from '@mantine/core';
import { useState } from 'react';
import { useGetAllExpenses } from '../../lib/hooks/useExpenses';
import { IExpenses } from '../../types/IExpenses';
import { CreateExpense, DeleteExpense, EditExpense } from './components';
import moment from 'moment';
import { IconEdit, IconTrash } from '@tabler/icons';

const Expenses = () => {
  const [isCreateExpense, setCreateExpense] = useState(false);
  const [isEditExpense, setEditExpense] = useState(false);
  const [isDeleteExpense, setDeleteExpense] = useState(false);
  const [item, setItem] = useState<IExpenses>({
    _id: 'string',
    type: 'string',
    tag: [],
    data: new Date(),
    value: 0,
    title: 'string',
    description: 'string',
    frequency: 'string',
  });
  const {
    data: ListExpense,
    refetch,
    isLoading: isLoadingExpenses,
  } = useGetAllExpenses();

  return (
    <>
      <Button
        onClick={() => {
          setCreateExpense(true);
        }}
      >
        Cadastrar
      </Button>

      <br />
      {isLoadingExpenses ? (
        <>
          <Loader /> Carregando dados
        </>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Frequência</th>
              <th>Data</th>
              <th>Editar</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody>
            {ListExpense?.map((chave: IExpenses) => {
              return (
                <tr>
                  <td>{chave.title}</td>
                  <td>{chave.value}</td>
                  <td>{chave.frequency}</td>
                  <td>{moment(chave.data).format('DD/MM/YYYY hh:mm')}</td>
                  <td>
                    <ActionIcon
                      onClick={() => {
                        setEditExpense(true);
                        setItem(chave);
                      }}
                    >
                      <IconEdit size={18} />
                    </ActionIcon>
                  </td>
                  <td>
                    <ActionIcon
                      onClick={() => {
                        setDeleteExpense(true);
                        setItem(chave);
                      }}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <CreateExpense
        isCreateExpense={isCreateExpense}
        setCreateExpense={() => {
          setCreateExpense(false);
        }}
      />

      <EditExpense
        isEditExpense={isEditExpense}
        setEditExpense={() => {
          setEditExpense(false);
          refetch();
        }}
        item={item}
      />
      <DeleteExpense
        isDeleteExpense={isDeleteExpense}
        setDeleteExpense={() => {
          setDeleteExpense(false);
          refetch();
        }}
        item={item}
      />

      <br />
      <br />
    </>
  );
};

export default Expenses;
