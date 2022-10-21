import { Button, Input, Modal, MultiSelect, Notification, NumberInput, Select, Textarea } from '@mantine/core'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {createExpense} from '../../../../lib/hooks/useExpenses'
import { queryClient } from '../../../../lib/queryClient'
import { IExpenses } from '../../../../types/IExpenses'
import { IProps } from './index.types'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { IconCheck, IconX } from '@tabler/icons';
import 'dayjs/locale/pt-br';
import { DatePicker } from '@mantine/dates';

const CreateExpense = ({isCreateExpense, setCreateExpense}: IProps) => {
  const [isVisible, setVisible] = useState(false) 
  const { mutate, isSuccess } = useMutation(createExpense, {
        onSuccess: () => { 
          queryClient.invalidateQueries(['createExpense'])
          setVisible(true)
          setCreateExpense()
        },
      })

      const { register,setValue, handleSubmit, watch, formState: { errors } } = useForm<IExpenses>({
        defaultValues: {
          data: new Date()
        }
      });
  const onSubmit = (data: IExpenses) => {
    console.log(data);
    mutate(data)
  }

  let listaType = [ 
    {
       
      "label": "Despesa", 
      "value": "Despesa", 
    },
    { 
      "label": "Débito", 
      "value": "Despesa", 
    },
    { 
      "label": "Assinatura", 
      "value": "Despesa", 
    },
    { 
      "label": "Pagamento único", 
      "value": "Despesa", 
    },
    { 
      "label": "Crédito", 
      "value": "Despesa", 
    }
  ]

  let listaTag = [
    {
       
      "value": "Aluguel",
      "label": "Aluguel"
    },
    {
   
      "value": "Despesa",
      "label": "Despesa"
    },
    {
   
      "value": "Saúde",
      "label": "Saúde",
    },
    {
     
      "value": "Entretenimento",
      "label": "Entretenimento"
    },
    {
       
      "value": "Assinatura",
      "label": "Assinatura"
    },
    {
    
      "value": "Compras",
      "label": "Compras"
    },
    {
  
      "value": "Roupas",
      "label": "Roupas"
    }
  ]

 let listaFrequency =[ 	{ 
  "value": "Sempre", 
  "label": "Sempre", 
},
{ 
  "value": "Eventualmente", 
  "label": "Eventualmente", 
}
]
    return (
    <>
    <Modal
    opened={isCreateExpense}
    onClose={setCreateExpense}
    title="Cadastrar despesa"
    fullScreen
  >
    <form onSubmit={handleSubmit(onSubmit)}>
    <Input.Wrapper label="Título"  >
    <Input 
      placeholder="De um titulo para seu gasto"
      {...register('title', {required: false})}
    />
    </Input.Wrapper>
    <Select
      placeholder="Cadastre seu tipo de gasto"
      label="Tipo de gasto"
      withAsterisk
      data={listaType}
      required={true}
      onChange={(e: any)=>{setValue('type', e)}} 
    />
    <Select
      placeholder="Frequência"
      label="Frequência"
      withAsterisk
      data={listaFrequency}
      required={true}
      onChange={(e:any)=>{setValue('frequency', e)}} 
    />
    <MultiSelect
      data={listaTag}
      label="Tag"
      placeholder="Tag de classificação"
      description="Selecione uma tag para classificar o gasto"
      withAsterisk 
      required={true}
      onChange={(e)=>{setValue('tag', e)}} 
    />
    <DatePicker 
      required={true} locale='pt-BR' onChange={(e:any)=>{setValue('data', e)}}  placeholder="Data do gasto" label="Data" withAsterisk />
    <NumberInput
      label="Valor"
      placeholder='Valor gasto'
      withAsterisk  
      min={0}
      step={0.01} 
      precision={2}
      required={true} onChange={(e:any)=>{setValue('value', e)}}
      
    />
     <Textarea
      placeholder="Descrição do gasto"
      label="Descição" 
      description="Descreva com maiores detalhes seu gasto"
      {...register('description', {required: false})}
    />
    <br/>
      <Button fullWidth type="submit">Salvar</Button>
    </form>
    
  </Modal>
  { isVisible && <Notification onClick={()=>{setVisible(false)}} icon={<IconCheck size={18} />} color="teal" title="Cadastro">
        Salvo com sucesso!
      </Notification>}
  </>)
}

export default CreateExpense