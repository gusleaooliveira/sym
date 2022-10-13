import {
  Button,
  Container,
  Input,
  InputBase,
  Modal,
  NativeSelect,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { IProps } from "./index.types";
import "dayjs/locale/pt-br";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons";

const Create = ({ isOpen, setVisible }: IProps) => {
  return (
    <Modal
      opened={isOpen}
      onClose={() => setVisible()}
      title="Cadastrar gastos"
      fullScreen
      centered
    >
      <Input.Wrapper label="Titulo">
        <Input placeholder="Descreva brevemente no que gastou" />
      </Input.Wrapper>

      <DatePicker
        locale="pt-br"
        placeholder="Selecione a data do gasto"
        label="Data"
        withAsterisk
        icon={<IconCalendar size={16} />}
      />

      <InputBase
        label="Tipo de gasto"
        withAsterisk
        placeholder="Tipo"
        component="select"
        mt="md"
      >
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>

      <InputBase
        label="Tag"
        withAsterisk
        placeholder="Tag"
        description="Selecione uma tag para organizar o tipo de gasto"
        component="select"
        mt="md"
      >
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>

      <InputBase
        label="Frequência desse gasto"
        placeholder="Frequência"
        withAsterisk 
        description="Qual a frequencia desse gasto?"
        component="select"
        mt="md"
      >
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>

      <Textarea
        placeholder="Descreva com mais detalhes seu gasto"
        label="Descrição"
      />

      <br />
      <Button fullWidth>Cadastrar</Button>
    </Modal>
  );
};

export default Create;
