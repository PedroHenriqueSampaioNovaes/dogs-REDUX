import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/user';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state);

  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({ username: username.value, password: password.value }),
      );
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" description="Entre em sua conta da Dogs!" />
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos'} />
      </form>
      <Link to="/login/perdeu" className={styles.perdeu}>
        Perdeu a Senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitulo}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link to="/login/criar" className={stylesBtn.button}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
