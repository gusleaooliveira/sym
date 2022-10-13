import { Input, Container, PasswordInput, Button, Box, Loader } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginUser } from "../../lib/hooks";
import { ILogin } from "../../types";
import { setCookie } from "nookies";
import { useDispatch } from "react-redux";
import { SET_TOKEN, SET_USER } from "../../store";

const Login = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (e) => {
      console.log("resp", e);

      dispatch({
        type: SET_TOKEN,
        token: e?.token,
      });
      dispatch({
        type: SET_USER,
        user: e?.user,
      });
    },

    onError: (e) => {
      console.log("err", e);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILogin>();
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Input.Wrapper label="Email" withAsterisk>
          <Input
            icon={<IconAt />}
            placeholder="Digite seu email"
            type={"email"}
            {...register("email")}
          />
        </Input.Wrapper>
        <Input.Wrapper label="Senha" withAsterisk>
          <PasswordInput placeholder="Password" {...register("password")} />
        </Input.Wrapper>
        <br />
        <Box>
          <Button type="submit" color="indigo" fullWidth>
            Entrar 
            {isLoading == true ?  <Loader />: <></>}
          </Button>
        </Box>
      </Container> 

    </form>
  );
};

export default Login;
