import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

import { useAuth } from "../contexts/authentication";
import { updateUser, updatePassword, deleteUser } from "../services/user";

import DefaultLayout from "../layouts/Default";
import { Sidebar } from "../components/Sidebar";

import styles from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();

  const { user, updateUserState, signOut } = useAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmitData(event: FormEvent) {
    event.preventDefault();

    if (user?.id) {
      const { id } = user;

      const { status, message } = await updateUser({
        id,
        phone,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);

        setPhone("");
        updateUserState({ phone });
      }
    }
  }

  const isPasswordAndConfirmPassword =
    password.length === 0 || confirmPassword.length === 0;

  async function handleSubmitPassword(event: FormEvent) {
    event.preventDefault();

    if (user?.id) {
      const { id } = user;

      const { status, message } = await updatePassword({
        id,
        password,
        confirmPassword,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);

        setPassword("");
        setConfirmPassword("");
      }
    }
  }

  async function handleDeleteUser() {
    if (confirm("Quer mesmo apagar esta conta?")) {
      if (user?.id) {
        const { id } = user;

        const { status, message } = await deleteUser({ id });

        if (status === "error") toast.error(message);
        if (status === "success") {
          toast.success(message);
          toast.info("Você foi deslogado");

          handleSignOut();
        }
      }
    }
  }

  function handleSignOut() {
    signOut();

    navigate("/");
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setPhone(event.target.value);
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
    <DefaultLayout>
      <div className={styles.profile}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.password}>
            <h2>Alterar seu perfil</h2>

            <form onSubmit={handleSubmitData} className={styles.passwordForm}>
              <InputMask
                mask="(99) 99999-9999"
                name="phone"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className={styles.input}
                placeholder="(01) 12345-6789"
                required
              />

              <button type="submit" disabled={!phone}>
                Confirmar
              </button>
            </form>
          </div>

          <div className={styles.password}>
            <h2>Alterar minha senha</h2>

            <form
              onSubmit={handleSubmitPassword}
              className={styles.passwordForm}
            >
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
                  if (!/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />

              <button type="submit" disabled={isPasswordAndConfirmPassword}>
                Confirmar
              </button>
            </form>
          </div>

          <div className={styles.deleteAccount}>
            <h2>Deletar minha conta</h2>

            <button onClick={handleDeleteUser}>Deletar</button>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
