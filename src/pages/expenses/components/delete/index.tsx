import {
  Alert,
  Box,
  Button,
  Dialog,
  Input,
  Modal,
  MultiSelect,
  Notification,
  NumberInput,
  Select,
  Text,
  Textarea,
} from '@mantine/core';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  createExpense,
  deleteExpense,
} from '../../../../lib/hooks/useExpenses';
import { queryClient } from '../../../../lib/queryClient';
import { IExpenses } from '../../../../types/IExpenses';
import { IProps } from './index.types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import { DatePicker } from '@mantine/dates';

const DeleteExpense = ({ isDeleteExpense, setDeleteExpense, item }: IProps) => {
  const { mutate, isSuccess } = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['deleteExpense']);
      setDeleteExpense();
    },
  });

  return (
    <>
      <Dialog
        opened={isDeleteExpense}
        withCloseButton
        onClose={setDeleteExpense}
        size="lg"
        radius="md"
      >
        <Text>Deseja pagar o gasto?</Text>
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Button color="gray" fullWidth onClick={setDeleteExpense}>
            Não
          </Button>
          <Button
            color="red"
            fullWidth
            onClick={() => {
              if (item?._id != null && item?._id != undefined) {
                mutate(item?._id);
              }
            }}
          >
            Sim
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default DeleteExpense;
