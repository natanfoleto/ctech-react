import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Plus, Minus, PencilLine, Trash, Lightning } from "phosphor-react";

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

import { findAllPermissions, IPermission } from "../services/permission";
import {
  findGroupPermissions,
  IGroupPermission,
  updateGroupPermission,
} from "../services/groupPermission";

import styles from "./Tab.module.css";

export function TabGroup() {
  const [name, setName] = useState("");
  const [groups, setGroups] = useState<IGroup[]>();
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const [permissions, setPermissions] = useState<IPermission[]>([]); // * Todas permissões
  const [groupPermissions, setGroupPermissions] = useState<IGroupPermission[]>(
    []
  ); // * Permissões atuais do grupo
  const [permissionId, setPermissionId] = useState(0); // * ID da permissão selecionada no <select/>
  const [permissionName, setPermissionName] = useState(""); // * Nome da permissão selecionada no <select/>
  const [permissionLore, setPermissionLore] = useState(""); // * Lore da permissão selecionada no <select/>
  const [permissionType, setPermissionType] = useState(""); // * Type da permissão selecionada no <select/>

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

    async function findSetAllPermissions() {
      const { status, message, data } = await findAllPermissions();

      if (status === "error") toast.error(message);
      if (status === "success") setPermissions(data);
    }

    findSetAllGroups();
    findSetAllPermissions();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedGroup(null);
    setGroupDialog(true);
  }

  function edit() {
    setGroupDialog(true);

    async function findSetGroupPermissions() {
      if (selectedGroup) {
        const { id } = selectedGroup;

        const { status, message, data } = await findGroupPermissions({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setGroupPermissions(data);
      }
    }

    findSetGroupPermissions();
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
      const ids = groupPermissions.map((permission) => {
        return permission.id;
      });

      const { status, message } = await updateGroup({ id, name });

      const res = await updateGroupPermission({
        id,
        permissions: ids,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      if (res.status === "error") toast.error(res.message);

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

  function handlePermissionChange(event: ChangeEvent<HTMLSelectElement>) {
    const id = Number(event.target.value);

    event.target.setCustomValidity("");
    setPermissionId(id);

    permissions?.forEach((permission) => {
      if (id === permission.id) {
        setPermissionName(permission.name);
        setPermissionLore(permission.lore);
        setPermissionType(permission.type);
      }
    });
  }

  function addGroupPermission() {
    const permissionFound = groupPermissions.filter(
      (item) => item.id === permissionId
    );

    if (permissionFound.length > 0) {
      toast.error("Essa permissão já esta na lista.");
      return;
    }

    setGroupPermissions([
      ...groupPermissions,
      {
        id: permissionId,
        name: permissionName,
        lore: permissionLore,
        type: permissionType,
      },
    ]);
  }

  function removeGroupPermission(id: number) {
    setGroupPermissions((groupPermission) =>
      groupPermission.filter((permission) => permission.id !== id)
    );
  }

  function selectGroup(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedGroup(value);
    setName(value.name);
    setPermissionId(permissions[0].id);
    setPermissionName(permissions[0].name);
    setPermissionLore(permissions[0].lore);
    setPermissionType(permissions[0].type);
  }

  function unselectGroup() {
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
        onRowClick={unselectGroup}
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
        style={{ minWidth: "500px" }}
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

          {selectedGroup ? (
            <>
              <label htmlFor="permission">Adicionar uma permissão</label>
              <div className={styles.permissionSelect}>
                <select
                  name="permission"
                  value={permissionId}
                  onChange={handlePermissionChange}
                  className={styles.select}
                  required
                >
                  {permissions?.map((permission) => (
                    <option key={permission.id} value={permission.id}>
                      {permission.name}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={addGroupPermission}>
                  <Plus size={16} weight="bold" />
                </button>
              </div>

              <div className={styles.permissionSelected}>
                <Lightning size={30} weight="fill" />
                <div className={styles.permissionInfo}>
                  <p>Poderes da permissão {permissionName}</p>
                  <span>
                    {permissionLore} [{permissionType}]
                  </span>
                </div>
              </div>

              {groupPermissions.length > 0 ? (
                <div className={styles.permissions}>
                  <div className={styles.permissionsHeader}>
                    <p>Detalhes</p>
                    <p>Deletar</p>
                  </div>

                  {groupPermissions?.map((permission) => (
                    <div className={styles.permissionsBody} key={permission.id}>
                      <p>
                        <strong>{permission.name}</strong>: {permission.lore}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeGroupPermission(permission.id)}
                      >
                        <Minus size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
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
        isOpen={deleteGroupDialog}
        title="Deletar Grupo?"
        subject={selectedGroup?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDel}
      />
    </div>
  );
}
