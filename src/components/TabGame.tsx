import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";

import { findAllGames, IGame } from "../services/game";

import styles from "./Tab.module.css";

export function TabGame() {
  const [games, setGames] = useState<IGame[]>();

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    device: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    free: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    banner_url: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllGames() {
      const { status, message, data } = await findAllGames();

      if (status === "error") toast.error(message);
      if (status === "success") setGames(data);
    }

    findSetAllGames();
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
      device: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      free: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      banner_url: {
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
        value={games}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "device", "free", "banner_url"]}
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
        emptyMessage="Nenhum jogo encontrado."
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
          key="device"
          field="device"
          header="Dispositivo"
          style={{ width: "25%" }}
          sortable
        />
        <Column
          key="free"
          field="free"
          header="Tipo"
          style={{ width: "10%" }}
          sortable
        />
        <Column
          key="banner_url"
          field="banner_url"
          header="Cover"
          style={{ width: "30%" }}
        />
      </DataTable>
    </div>
  );
}
