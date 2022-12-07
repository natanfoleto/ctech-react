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
  findAllPermissions,
  IPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "../services/permission";

import styles from "./Tab.module.css";

export function TabPermission() {
  const [name, setName] = useState("");
  const [lore, setLore] = useState("");
  const [type, setType] = useState("");
  const [permissions, setPermissions] = useState<IPermission[]>();
  const [selectedPermission, setSelectedPermission] =
    useState<IPermission | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [permissionDialog, setPermissionDialog] = useState(false);
  const [deletePermissionDialog, setDeletePermissionDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    lore: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    type: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllPermissions() {
      const { status, message, data } = await findAllPermissions();

      if (status === "error") toast.error(message);
      if (status === "success") setPermissions(data);
    }

    findSetAllPermissions();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedPermission(null);
    setPermissionDialog(true);
  }

  function edit() {
    setPermissionDialog(true);
  }

  function del() {
    setDeletePermissionDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createPermission({ name, lore, type });

    if (status === "success") {
      toast.success(message);
    }
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedPermission?.id;

    if (id) {
      const { status, message } = await updatePermission({
        id,
        name,
        lore,
        type,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  async function handleSubmitDel() {
    const id = selectedPermission?.id;

    if (id) {
      const { status, message } = await deletePermission({ id });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearState();
      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setName(event.target.value);
  }

  function handleLoreChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setLore(event.target.value);
  }

  function handleTypeChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setType(event.target.value);
  }

  function selectPermission(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedPermission(value);
    setName(value.name);
    setLore(value.lore);
    setType(value.type);
  }

  function unselectPermission() {
    if (selectedPermission) clearState();
  }

  function clearForm() {
    setName("");
    setLore("");
    setType("");
  }

  function clearState() {
    clearForm();
    setSelectedPermission(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setPermissionDialog(false);
    setDeletePermissionDialog(false);
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
      lore: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      type: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
    });

    setGlobalFilterValue("");
  }

  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className={styles.buttons}>
          <button onClick={add}>
            <Plus size={22} weight="bold" />
          </button>
          <button disabled={selectedPermission === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedPermission === null} onClick={del}>
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
    <div className={styles.tab}>
      <DataTable
        value={permissions}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "lore", "type"]}
        selection={selectedPermission}
        onSelectionChange={(e) => selectPermission(e)}
        onRowClick={unselectPermission}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        resizableColumns
        columnResizeMode="fit"
        emptyMessage="Nenhuma permissão encontrada."
      >
        <Column
          key="id"
          field="id"
          header="ID"
          style={{ width: "10%" }}
          sortable
        />
        <Column
          key="name"
          field="name"
          header="Nome"
          style={{ width: "50%" }}
          sortable
        />
        <Column
          key="lore"
          field="lore"
          header="Poderes"
          style={{ width: "20%" }}
          sortable
        />
        <Column
          key="type"
          field="type"
          header="Tipo"
          style={{ width: "20%" }}
          sortable
        />
      </DataTable>

      <Dialog
        visible={permissionDialog}
        style={{ minWidth: "450px" }}
        header={selectedPermission ? "Editando Permissão" : "Nova Permissão"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedPermission ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome da permissão"
            required
          />

          <input
            name="lore"
            type="text"
            value={lore}
            onChange={handleLoreChange}
            className={styles.input}
            placeholder="Poderes da permissão"
            required
          />

          <input
            name="type"
            type="text"
            value={type}
            onChange={handleTypeChange}
            className={styles.input}
            placeholder="Tipo da permissão"
            required
          />

          <div className={styles.subimitDialog}>
            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deletePermissionDialog}
        title="Deletar Permissão?"
        subject={selectedPermission?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDel}
      />
    </div>
  );
}
