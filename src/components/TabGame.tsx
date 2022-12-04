import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Plus, Minus, PencilLine, Trash, Play, Pause } from "phosphor-react";

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
  findAllGames,
  IGame,
  ISchedule,
  createGame,
  updateGame,
  deleteGame,
} from "../services/game";

import styles from "./Tab.module.css";

export function TabGame() {
  const [name, setName] = useState("");
  const [device, setDevice] = useState("PS4");
  const [modality, setModality] = useState("Livre");
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [games, setGames] = useState<IGame[]>();
  const [selectedGame, setSelectedGame] = useState<IGame | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [gameDialog, setGameDialog] = useState(false);
  const [deleteGameDialog, setDeleteGameDialog] = useState(false);
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
    modality: {
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
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedGame(null);
    setGameDialog(true);

    setDevice("PS4");
    setModality("Livre");
  }

  function edit() {
    setGameDialog(true);
  }

  function del() {
    setDeleteGameDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    if (schedules.length === 0) {
      toast.error("Insira no mínimo um horário de início e fim.");
      return;
    }

    const { status, message } = await createGame({
      name,
      device,
      modality,
      schedules,
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

    if (schedules.length === 0) {
      toast.error("Insira no mínimo um horário de início e fim.");
      return;
    }

    const id = selectedGame?.id;

    if (id) {
      const { status, message } = await updateGame({
        id,
        name,
        device,
        modality,
        schedules,
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
    const id = selectedGame?.id;

    if (id) {
      const { status, message } = await deleteGame({ id });

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

  function handleDeviceChange(event: ChangeEvent<HTMLSelectElement>) {
    event.target.setCustomValidity("");
    setDevice(event.target.value);
  }

  function handleModalityChange(event: ChangeEvent<HTMLSelectElement>) {
    event.target.setCustomValidity("");
    setModality(event.target.value);
  }

  function handleHourStartChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setHourStart(event.target.value);
  }

  function handleHourEndChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setHourEnd(event.target.value);
  }

  function handleBannerUrlChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setBannerUrl(event.target.value);
  }

  function addSchedule() {
    if (!hourStart || !hourEnd) {
      toast.error("Insira a hora inicial e hora final.");
      return;
    }

    if (hourStart >= hourEnd) {
      toast.error("A hora inicial tem que ser menor que a hora final.");
      return;
    }

    setSchedules([...schedules, { hour_start: hourStart, hour_end: hourEnd }]);

    setHourStart("");
    setHourEnd("");
  }

  function removeSchedule(index: number) {
    setSchedules((schedule) => schedule.filter((fruit, idx) => idx !== index));
  }

  function selectGame(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedGame(value);
    setName(value.name);
    setDevice(value.device);
    setModality(value.modality);
    setSchedules(value.schedules);
    setBannerUrl(value.banner_url);
  }

  function unselectGame() {
    if (selectedGame) clearState();
  }

  function clearForm() {
    setName("");
    setDevice("");
    setModality("");
    setSchedules([]);
    setBannerUrl("");
  }

  function clearState() {
    clearForm();
    setSelectedGame(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setGameDialog(false);
    setDeleteGameDialog(false);
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
      device: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      modality: {
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
          <button disabled={selectedGame === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedGame === null} onClick={del}>
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
        value={games}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "device", "modality", "banner_url"]}
        selection={selectedGame}
        onSelectionChange={(e) => selectGame(e)}
        onRowClick={unselectGame}
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
          key="modality"
          field="modality"
          header="Modalidade"
          style={{ width: "10%" }}
          sortable
        />
        <Column
          key="banner_url"
          field="banner_url"
          header="URL do Banner"
          style={{ width: "30%" }}
        />
      </DataTable>

      {selectedGame && (
        <Draggable defaultClassName={styles.draggable}>
          <div className={styles.cover}>
            <img src={bannerUrl} alt="Cover" />
          </div>
        </Draggable>
      )}

      <Dialog
        visible={gameDialog}
        style={{ minWidth: "500px" }}
        header={selectedGame ? "Editando Game" : "Novo Game"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedGame ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome do game"
            required
          />

          <label htmlFor="device">Selecione o dispositivo</label>
          <select
            name="device"
            value={device}
            onChange={handleDeviceChange}
            className={styles.select}
            required
          >
            <option value="PS4">PS4</option>
            <option value="Xbox One">Xbox One</option>
            <option value="Notebook">Notebook</option>
            <option value="20000 Jogos">20000 Jogos</option>
          </select>

          <label htmlFor="modality">Selecione a modalidade</label>
          <select
            name="modality"
            value={modality}
            onChange={handleModalityChange}
            className={styles.select}
            required
          >
            <option value="Livre">Livre</option>
            <option value="Torneio">Torneio</option>
          </select>

          <label htmlFor="hourStart">Horários de funcionamento</label>
          <div className={styles.formSchedules}>
            <input
              name="hourStart"
              type="time"
              value={hourStart}
              className={styles.input}
              onChange={handleHourStartChange}
            />

            <input
              name="hourEnd"
              type="time"
              value={hourEnd}
              className={styles.input}
              onChange={handleHourEndChange}
            />
            <button type="button" onClick={addSchedule}>
              <Plus size={16} weight="bold" />
            </button>
          </div>

          <div className={styles.schedules}>
            {schedules.map((schedule, idx) => (
              <div key={idx} className={styles.schedule}>
                <span>
                  <Play size={20} weight="fill" />
                  <p>{schedule.hour_start}</p>
                </span>

                <span>
                  <Pause size={20} weight="fill" />
                  <p>{schedule.hour_end}</p>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    removeSchedule(idx);
                  }}
                >
                  <Minus size={16} weight="bold" />
                </button>
              </div>
            ))}
          </div>

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
        isOpen={deleteGameDialog}
        title="Deletar Game?"
        subject={selectedGame?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDelete}
      />
    </div>
  );
}
