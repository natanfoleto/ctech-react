import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Plus, PencilLine, Trash } from "phosphor-react";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";

import { findAllPermissions, IPermission } from "../services/permission";

import styles from "./Tab.module.css";

export function TabPermission() {
  const [permissions, setPermissions] = useState<IPermission[]>();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
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
  }, []);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearFilter = () => {
    initFilters();
    setSelectedCustomer(null);
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
  };

  const customer = selectedCustomer ? false : true;

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <div className={styles.buttons}>
          <button>
            <Plus size={22} weight="bold" />
          </button>
          <button disabled={customer}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={customer}>
            <Trash size={22} weight="fill" />
          </button>
        </div>

        <div className="flex gap-1">
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
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className={styles.tab}>
      <DataTable
        value={permissions}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "lore", "type"]}
        selection={selectedCustomer}
        onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        resizableColumns
        columnResizeMode="fit"
        showGridlines
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
    </div>
  );
}
