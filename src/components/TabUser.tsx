import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Plus, PencilLine, Trash } from "phosphor-react";

import {
  DataTable,
  DataTableSelectionChangeParams,
} from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

import { DeleteDialog } from "./DeleteDialog";

import {
  findAllUsers,
  IUser,
  createUser,
  updateUser,
  deleteUser,
} from "../services/user";

import styles from "./Tab.module.css";

export function TabUser() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState<IUser[]>();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    username: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "group.name": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    phone: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    birth_date: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllUsers() {
      const { status, message, data } = await findAllUsers();

      if (status === "error") toast.error(message);
      if (status === "success") setUsers(data);
    }

    findSetAllUsers();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedUser(null);
    setUserDialog(true);
  }

  function edit() {
    setUserDialog(true);
  }

  function del() {
    setDeleteUserDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não estão iguais!");
      return;
    }

    const { status, message } = await createUser({
      username,
      name,
      birthDate,
      password,
      confirmPassword,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedUser?.id;

    if (id) {
      const { status, message } = await updateUser({
        id,
        name,
        phone: selectedUser.phone,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      clearState();
      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  async function handleSubmitDelete() {
    const id = selectedUser?.id;

    if (id) {
      const { status, message } = await deleteUser({ id });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearState();
      hideDialog();
      setLastLoadTime(new Date());
    }
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

  function selectUser(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedUser(value);
    setUsername(value.username);
    setName(value.name);
    setBirthDate(value.birth_date);
  }

  function unselectEvent() {
    if (selectedUser) clearState();
  }

  function clearForm() {
    setUsername("");
    setName("");
    setBirthDate("");
    setPassword("");
    setConfirmPassword("");
  }

  function clearState() {
    clearForm();
    setSelectedUser(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setUserDialog(false);
    setDeleteUserDialog(false);
  }

  function initFilters() {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        value: null,
        matchMode: FilterMatchMode.EQUALS,
      },
      name: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      username: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      "group.name": {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      phone: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      birth_date: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
    });

    setGlobalFilterValue("");
  }

  function formatDate(value: Date) {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function dateBodyTemplate(rowData: IUser) {
    return formatDate(new Date(rowData.birth_date));
  }

  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className={styles.buttons}>
          <button onClick={add}>
            <Plus size={22} weight="bold" />
          </button>
          <button disabled={selectedUser === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedUser === null} onClick={del}>
            <Trash size={22} weight="fill" />
          </button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            onClick={initFilters}
          />

          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar"
            />
          </span>
        </div>
      </div>
    );
  };

  const paginatorLeft = (
    <span>
      Tabela atualizada às {lastLoadTime.getHours()}h
      {lastLoadTime.getMinutes() > 9
        ? lastLoadTime.getMinutes()
        : `0${lastLoadTime.getMinutes()}`}
      m
      {lastLoadTime.getSeconds() > 9
        ? lastLoadTime.getSeconds()
        : `0${lastLoadTime.getSeconds()}`}
      s
    </span>
  );
  const paginatorRight = (
    <Button
      type="button"
      icon="pi pi-refresh"
      className="p-button-text"
      onClick={clearState}
    />
  );

  return (
    <div>
      <DataTable
        value={users}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "username", "group.name", "phone"]}
        selection={selectedUser}
        onSelectionChange={(e) => selectUser(e)}
        onRowClick={unselectEvent}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        resizableColumns
        columnResizeMode="fit"
        emptyMessage="Nenhum usuário encontrado."
      >
        <Column
          key="id"
          field="id"
          header="ID"
          style={{ width: "5%" }}
          sortable
        />
        <Column
          key="name"
          field="name"
          header="Nome"
          style={{ width: "30%" }}
          sortable
        />
        <Column
          key="username"
          field="username"
          header="Username"
          style={{ width: "25%" }}
          sortable
        />
        <Column
          key="group.name"
          field="group.name"
          header="Grupo"
          style={{ width: "20%" }}
          sortable
        />
        <Column
          key="phone"
          field="phone"
          header="Telefone"
          style={{ width: "10%" }}
        />
        <Column
          key="birth_date"
          field="birth_date"
          header="Data Nasc."
          dataType="date"
          body={dateBodyTemplate}
          style={{ width: "10%" }}
        />
      </DataTable>

      <Dialog
        visible={userDialog}
        style={{ minWidth: "450px" }}
        header={selectedUser ? "Editando Usuário" : "Novo Usuário"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedUser ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          {!selectedUser ? (
            <input
              name="username"
              type="text"
              value={username}
              className={styles.input}
              onChange={handleUsernameChange}
              placeholder="Digite o username"
              required
            />
          ) : null}

          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome completo"
            required
          />

          {!selectedUser ? (
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
          ) : null}

          {!selectedUser ? (
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
              placeholder="Senha secreta"
              required
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
              }}
            />
          ) : null}

          {!selectedUser ? (
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
          ) : null}

          <div className={styles.subimitDialog}>
            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deleteUserDialog}
        title="Deletar Usuário?"
        subject={selectedUser?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDelete}
      />
    </div>
  );
}
