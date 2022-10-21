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
  createRevenues,
  deleteRevenues,
} from '../../../../lib/hooks/useRevenues';
import { queryClient } from '../../../../lib/queryClient';
import { IRevenues } from '../../../../types/IRevenues';
import { IProps } from './index.types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons';
import { DatePicker } from '@mantine/dates';

const DeleteRevenue = ({ isDeleteRevenue, setDeleteRevenue, item }: IProps) => {
  const { mutate, isSuccess } = useMutation(deleteRevenues, {
    onSuccess: () => {
      queryClient.invalidateQueries(['deleteRevenue']);
      setDeleteRevenue();
    },
  });

  return (
    <>
      <Dialog
        opened={isDeleteRevenue}
        withCloseButton
        onClose={setDeleteRevenue}
        size="lg"
        radius="md"
      >
        <Text>Deseja pagar a receita?</Text>
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Button color="gray" fullWidth onClick={setDeleteRevenue}>
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

export default DeleteRevenue;
