import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";

import { findAllUsers, IUser } from "../services/user";

import styles from "./Tab.module.css";

export function TabUser() {
  const [users, setUsers] = useState<IUser[]>();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
  });

  useEffect(() => {
    async function findSetAllUsers() {
      const { status, message, data } = await findAllUsers();

      if (status === "error") toast.error(message);
      if (status === "success") setUsers(data);
    }

    findSetAllUsers();
  }, []);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
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
    });

    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter}
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
    );
  };

  const header = renderHeader();

  return (
    <div className={styles.tab}>
      <DataTable
        value={users}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "username", "group.name", "phone"]}
        selection={selectedCustomer}
        onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        resizableColumns
        columnResizeMode="fit"
        showGridlines
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
          style={{ width: "30%" }}
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
          style={{ width: "15%" }}
        />
      </DataTable>
    </div>
  );
}
