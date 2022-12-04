import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Plus, PencilLine, Trash } from "phosphor-react";

import Draggable from "react-draggable";

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
  findAllEvents,
  IEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/event";

import styles from "./Tab.module.css";

export function TabEvent() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [events, setEvents] = useState<IEvent[]>();
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [eventDialog, setEventDialog] = useState(false);
  const [deleteEventDialog, setDeleteEventDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    notes: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    banner_url: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllEvents() {
      const { status, message, data } = await findAllEvents();

      if (status === "error") toast.error(message);
      if (status === "success") setEvents(data);
    }

    findSetAllEvents();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedEvent(null);
    setEventDialog(true);
  }

  function edit() {
    setEventDialog(true);
  }

  function del() {
    setDeleteEventDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createEvent({
      name,
      notes,
      bannerUrl,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedEvent?.id;

    if (id) {
      const { status, message } = await updateEvent({
        id,
        name,
        notes,
        bannerUrl,
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
    const id = selectedEvent?.id;

    if (id) {
      const { status, message } = await deleteEvent({ id });

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

  function handleNotesChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNotes(event.target.value);
  }

  function handleBannerUrlChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setBannerUrl(event.target.value);
  }

  function selectEvent(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedEvent(value);
    setName(value.name);
    setNotes(value.notes);
    setBannerUrl(value.banner_url);
  }

  function unselectEvent() {
    if (selectedEvent) clearState();
  }

  function clearForm() {
    setName("");
    setNotes("");
    setBannerUrl("");
  }

  function clearState() {
    clearForm();
    setSelectedEvent(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setEventDialog(false);
    setDeleteEventDialog(false);
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
      notes: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      banner_url: {
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
          <button disabled={selectedEvent === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedEvent === null} onClick={del}>
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
        value={events}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "notes", "banner_url"]}
        selection={selectedEvent}
        onSelectionChange={(e) => selectEvent(e)}
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
        emptyMessage="Nenhum evento encontrado."
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
          style={{ width: "25%" }}
          sortable
        />
        <Column
          key="notes"
          field="notes"
          header="Descrição"
          style={{ width: "40%" }}
          sortable
        />
        <Column
          key="banner_url"
          field="banner_url"
          header="URL do Banner"
          style={{ width: "30%" }}
        />
      </DataTable>

      {selectedEvent && (
        <Draggable defaultClassName={styles.draggable}>
          <div className={styles.cover}>
            <img src={bannerUrl} alt="Cover" />
          </div>
        </Draggable>
      )}

      <Dialog
        visible={eventDialog}
        style={{ minWidth: "450px" }}
        header={selectedEvent ? "Editando Evento" : "Novo Evento"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedEvent ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome do evento"
            required
          />

          <input
            name="notes"
            type="text"
            value={notes}
            className={styles.input}
            onChange={handleNotesChange}
            placeholder="Descrição do evento"
            required
          />

          <input
            name="bannerUrl"
            type="text"
            value={bannerUrl}
            className={styles.input}
            onChange={handleBannerUrlChange}
            placeholder="Link da imagem do banner"
            required
          />

          <div className={styles.bannerPreview}>
            <p>Pré visualização do banner</p>
            <img
              src={bannerUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://img.icons8.com/ios-filled/512/no-image.png";
              }}
              alt="Pré-visualização"
            />
          </div>

          <div className={styles.subimitDialog}>
            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deleteEventDialog}
        title="Deletar Evento?"
        subject={selectedEvent?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDelete}
      />
    </div>
  );
}
