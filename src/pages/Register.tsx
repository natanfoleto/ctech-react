import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUser } from "../services/user";

import styles from "./Register.module.css";

import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleNavigateLogin() {
    navigate("/");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createUser({
      username,
      name,
      birthDate,
      password,
      confirmPassword,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    handleNavigateLogin();
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setUsername(event.target.value);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setName(event.target.value);
  }

  function handleDateChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setBirthDate(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setConfirmPassword(event.target.value);
  }

  return (
    <div className={styles.container}>
      <main className={styles.box}>
        <img src={logo} className={styles.cover} />

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="username"
            type="text"
            value={username}
            className={styles.input}
            onChange={handleUsernameChange}
            placeholder="Digite seu username"
            required
          />

          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Digite seu nome completo"
            required
          />

          <input
            name="birthDate"
            type="date"
            value={birthDate}
            onChange={handleDateChange}
            min="1900-01-01"
            max="2022-12-31"
            required
            className={styles.input}
          />

          <input
            name="password"
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            placeholder="Sua senha secreta"
            required
            onKeyPress={(e) => {
              if (e.key === "Enter") return;
              if (!/[0-9]/.test(e.key)) e.preventDefault();
            }}
          />

          <input
            name="confirmPassword"
            type="password"
            pattern="[0-9]*"
            inputMode="numeric"
            minLength={4}
            maxLength={4}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles.input}
            placeholder="Confirme a senha"
            required
            onKeyPress={(e) => {
              if (e.key === "Enter") return;
              if (!/[0-9]/.test(e.key)) e.preventDefault();
            }}
          />

          <button type="submit" className={styles.button}>
            REGISTRAR
          </button>

          <a className={styles.subscribe} onClick={handleNavigateLogin}>
            Já tem inscrição? Logue-se
          </a>
        </form>
      </main>
    </div>
  );
}

export default Login;
