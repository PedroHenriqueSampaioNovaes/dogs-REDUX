import React from 'react';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Head from '../Helper/Head';
import { USER_POST } from '../../api';
import Error from '../Helper/Error';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/user';
import useFetch from '../../Hooks/useFetch';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  
  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok)
        dispatch(
          userLogin({ username: username.value, password: password.value }),
        );
    }
  }

  return (
    <section className="animeLeft">
      <Head
        title="Crie sua conta"
        description="Crie sua conta na Dogs e tenha acesso a diversas fotos fofas de animais"
      />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Usuário"
          name="username"
          id="username"
          {...username}
        />
        <Input type="email" label="Email" name="email" id="email" {...email} />
        <Input
          type="password"
          label="Senha"
          name="password"
          id="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Cadastrando</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <Error error={error} />}
      </form>
    </section>
  );
};

export default LoginCreate;
