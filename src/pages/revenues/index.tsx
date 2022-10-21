import { ActionIcon, Button, Loader, Table } from '@mantine/core';
import { useState } from 'react';
import { useGetAllRevenues } from '../../lib/hooks/useRevenues';
import { IRevenues } from '../../types/IRevenues';
import { CreateRevenues, DeleteRevenues, EditRevenues } from './components';
import moment from 'moment';
import { IconEdit, IconTrash } from '@tabler/icons';

const Revenues = () => {
  const [isCreateRevenues, setCreateRevenues] = useState(false);
  const [isEditRevenues, setEditRevenues] = useState(false);
  const [isDeleteRevenues, setDeleteRevenues] = useState(false);
  const [item, setItem] = useState<IRevenues>({
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
    data: ListRevenues,
    refetch,
    isLoading: isLoadingRevenuess,
  } = useGetAllRevenues();

  return (
    <>
      <Button
        onClick={() => {
          setCreateRevenues(true);
        }}
      >
        Cadastrar
      </Button>

      <br />
      {isLoadingRevenuess ? (
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
            {ListRevenues?.map((chave: IRevenues) => {
              return (
                <tr>
                  <td>{chave.title}</td>
                  <td>{chave.value}</td>
                  <td>{chave.frequency}</td>
                  <td>{moment(chave.data).format('DD/MM/YYYY hh:mm')}</td>
                  <td>
                    <ActionIcon
                      onClick={() => {
                        setEditRevenues(true);
                        setItem(chave);
                      }}
                    >
                      <IconEdit size={18} />
                    </ActionIcon>
                  </td>
                  <td>
                    <ActionIcon
                      onClick={() => {
                        setDeleteRevenues(true);
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

      <CreateRevenues
        isCreateRevenues={isCreateRevenues}
        setCreateRevenues={() => {
          setCreateRevenues(false);
        }}
      />

      <EditRevenues
        isEditRevenue={isEditRevenues}
        setEditRevenue={() => {
          setEditRevenues(false);
          refetch();
        }}
        item={item}
      />
      <DeleteRevenues
        isDeleteRevenue={isDeleteRevenues}
        setDeleteRevenue={() => {
          setDeleteRevenues(false);
          refetch();
        }}
        item={item}
      />

      <br />
      <br />
    </>
  );
};

export default Revenues;
