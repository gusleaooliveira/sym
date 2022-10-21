import {
  Button,
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
import { createRevenues } from '../../../../lib/hooks/useRevenues';
import { queryClient } from '../../../../lib/queryClient';
import { IRevenues } from '../../../../types/IRevenues';
import { IProps } from './index.types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import 'dayjs/locale/pt-br';
import { DatePicker } from '@mantine/dates';

const CreateRevenues = ({ isCreateRevenues, setCreateRevenues }: IProps) => {
  const [isVisible, setVisible] = useState(false);
  const { mutate, isSuccess } = useMutation(createRevenues, {
    onSuccess: () => {
      queryClient.invalidateQueries(['createRevenues']);
      setVisible(true);
      setCreateRevenues();
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRevenues>({
    defaultValues: {
      data: new Date(),
    },
  });
  const onSubmit = (data: IRevenues) => {
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
  return (
    <>
      <Modal
        opened={isCreateRevenues}
        onClose={setCreateRevenues}
        title="Cadastrar despesa"
        fullScreen
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input.Wrapper label="Título">
            <Input
              placeholder="De um titulo para seu receita"
              {...register('title', { required: false })}
            />
          </Input.Wrapper>
          <Select
            placeholder="Cadastre seu tipo de receita"
            label="Tipo de receita"
            withAsterisk
            data={listaType}
            required={true}
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
            onChange={(e: any) => {
              setValue('frequency', e);
            }}
          />
          <MultiSelect
            data={listaTag}
            label="Tag"
            placeholder="Tag de classificação"
            description="Selecione uma tag para classificar o receita"
            withAsterisk
            required={true}
            onChange={(e) => {
              setValue('tag', e);
            }}
          />
          <DatePicker
            required={true}
            locale="pt-BR"
            onChange={(e: any) => {
              setValue('data', e);
            }}
            placeholder="Data do receita"
            label="Data"
            withAsterisk
          />
          <NumberInput
            label="Valor"
            placeholder="Valor receita"
            withAsterisk
            min={0}
            step={0.01}
            precision={2}
            required={true}
            onChange={(e: any) => {
              setValue('value', e);
            }}
          />
          <Textarea
            placeholder="Descrição do receita"
            label="Descição"
            description="Descreva com maiores detalhes seu receita"
            {...register('description', { required: false })}
          />
          <br />
          <Button fullWidth type="submit">
            Salvar
          </Button>
        </form>
      </Modal>
      {isVisible && (
        <Notification
          onClick={() => {
            setVisible(false);
          }}
          icon={<IconCheck size={18} />}
          color="teal"
          title="Cadastro"
        >
          Salvo com sucesso!
        </Notification>
      )}
    </>
  );
};

export default CreateRevenues;
