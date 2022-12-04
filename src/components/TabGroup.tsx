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
  findAllGroups,
  IGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../services/group";

import styles from "./Tab.module.css";

export function TabGroup() {
  const [name, setName] = useState("");
  const [groups, setGroups] = useState<IGroup[]>();
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [groupDialog, setGroupDialog] = useState(false);
  const [deleteGroupDialog, setDeleteGroupDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllGroups() {
      const { status, message, data } = await findAllGroups();

      if (status === "error") toast.error(message);
      if (status === "success") setGroups(data);
    }

    findSetAllGroups();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedGroup(null);
    setGroupDialog(true);
  }

  function edit() {
    setGroupDialog(true);
  }

  function del() {
    setDeleteGroupDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createGroup({ name });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedGroup?.id;

    if (id) {
      const { status, message } = await updateGroup({ id, name });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  async function handleSubmitDel() {
    const id = selectedGroup?.id;

    if (id) {
      const { status, message } = await deleteGroup({ id });

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

  function selectGroup(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedGroup(value);
    setName(value.name);
  }

  function unselectEvent() {
    if (selectedGroup) clearState();
  }

  function clearForm() {
    setName("");
  }

  function clearState() {
    clearForm();
    setSelectedGroup(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setGroupDialog(false);
    setDeleteGroupDialog(false);
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
          <button disabled={selectedGroup === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedGroup === null} onClick={del}>
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
        value={groups}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name"]}
        selection={selectedGroup}
        onSelectionChange={(e) => selectGroup(e)}
        onRowClick={unselectEvent}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        emptyMessage="Nenhum grupo encontrado."
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
          style={{ width: "90%" }}
          sortable
        />
      </DataTable>

      <Dialog
        visible={groupDialog}
        style={{ minWidth: "450px" }}
        header={selectedGroup ? "Editando Grupo" : "Novo Grupo"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedGroup ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome do grupo"
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
        isOpen={deleteGroupDialog}
        title="Deletar Grupo?"
        subject={selectedGroup?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDel}
      />
    </div>
  );
}
