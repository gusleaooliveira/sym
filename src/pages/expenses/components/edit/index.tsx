import {
  Button,
  Drawer,
  Input,
  Modal,
  MultiSelect,
  Notification,
  NumberInput,
  Select,
  Textarea,
} from '@mantine/core';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createExpense, editExpense } from '../../../../lib/hooks/useExpenses';
import { queryClient } from '../../../../lib/queryClient';
import { IExpenses } from '../../../../types/IExpenses';
import { IProps } from './index.types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import 'dayjs/locale/pt-br';
import { DatePicker } from '@mantine/dates';

const EditExpense = ({ isEditExpense, setEditExpense, item }: IProps) => {
  const [isVisible, setVisible] = useState(false);
  const { mutate, isSuccess } = useMutation(editExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['editExpense']);
      setVisible(true);
      setEditExpense();
    },
  });

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IExpenses>({
    defaultValues: {
      data: new Date(),
    },
  });
  const onSubmit = (data: IExpenses) => {
    console.log(data);
    mutate(data);
  };

  let listaType = [
    {
      label: 'Despesa',
      value: 'Despesa',
    },
    {
      label: 'Débito',
      value: 'Despesa',
    },
    {
      label: 'Assinatura',
      value: 'Despesa',
    },
    {
      label: 'Pagamento único',
      value: 'Despesa',
    },
    {
      label: 'Crédito',
      value: 'Despesa',
    },
  ];

  let listaTag = [
    {
      value: 'Aluguel',
      label: 'Aluguel',
    },
    {
      value: 'Despesa',
      label: 'Despesa',
    },
    {
      value: 'Saúde',
      label: 'Saúde',
    },
    {
      value: 'Entretenimento',
      label: 'Entretenimento',
    },
    {
      value: 'Assinatura',
      label: 'Assinatura',
    },
    {
      value: 'Compras',
      label: 'Compras',
    },
    {
      value: 'Roupas',
      label: 'Roupas',
    },
  ];

  let listaFrequency = [
    {
      value: 'Sempre',
      label: 'Sempre',
    },
    {
      value: 'Eventualmente',
      label: 'Eventualmente',
    },
  ];

  useEffect(() => {
    if (item != undefined) {
      reset(item);
    }
  }, [item]);
  return (
    <>
      <Drawer
        opened={isEditExpense}
        onClose={setEditExpense}
        title="Editar despesa"
        size="xl"
        padding="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Título">
            <Input
              placeholder="De um titulo para seu gasto"
              {...register('title', { required: false })}
            />
          </Input.Wrapper>
          <Select
            placeholder="Cadastre seu tipo de gasto"
            label="Tipo de gasto"
            withAsterisk
            data={listaType}
            required={true}
            value={watch('type')}
            onChange={(e: any) => {
              setValue('type', e);
            }}
          />
          <Select
            placeholder="Frequência"
            label="Frequência"
            withAsterisk
            data={listaFrequency}
            required={true}
            value={watch('frequency')}
            onChange={(e: any) => {
              setValue('frequency', e);
            }}
          />
          <MultiSelect
            data={listaTag}
            label="Tag"
            placeholder="Tag de classificação"
            description="Selecione uma tag para classificar o gasto"
            withAsterisk
            required={true}
            value={watch('tag')}
            onChange={(e) => {
              setValue('tag', e);
            }}
          />
          <DatePicker
            required={true}
            value={watch('data')}
            locale="pt-BR"
            onChange={(e: any) => {
              setValue('data', e);
            }}
            placeholder="Data do gasto"
            label="Data"
            withAsterisk
          />
          <NumberInput
            label="Valor"
            placeholder="Valor gasto"
            withAsterisk
            min={0}
            step={0.01}
            precision={2}
            value={watch('value')}
            required={true}
            onChange={(e: any) => {
              setValue('value', e);
            }}
          />
          <Textarea
            placeholder="Descrição do gasto"
            label="Descição"
            description="Descreva com maiores detalhes seu gasto"
            {...register('description', { required: false })}
          />
          <br />
          <Button fullWidth type="submit">
            Salvar
          </Button>
        </form>
      </Drawer>
      {isVisible && (
        <Notification
          onClick={() => {
            setVisible(false);
          }}
          icon={<IconCheck size={18} />}
          color="teal"
          title="Editar"
        >
          Editado com sucesso!
        </Notification>
      )}
    </>
  );
};

export default EditExpense;
