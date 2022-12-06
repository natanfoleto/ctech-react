import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/authentication";

import styles from "./Login.module.css";

import logo from "../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleNavigateRegister() {
    navigate("/register");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await signIn({ username, password });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);
  }

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setPassword(event.target.value);
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
            id="last"
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

          <button type="submit" className={styles.button}>
            {loading ? "LOGANDO" : "LOGIN"}
          </button>

          <a className={styles.subscribe} onClick={handleNavigateRegister}>
            Não tem inscrição? Inscreva-se
          </a>
        </form>
      </main>
    </div>
  );
}

export default Login;
