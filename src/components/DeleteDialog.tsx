import { Dialog } from "primereact/dialog";

import { X, Check } from "phosphor-react";

import styles from "./DeleteDialog.module.css";

interface DeleteDialogProps {
  isOpen?: boolean;
  title: string;
  subject?: string;
  onHide: () => void;
  onDelete: () => void;
}

export function DeleteDialog({
  isOpen,
  title,
  subject,
  onHide,
  onDelete,
}: DeleteDialogProps) {
  const deleteUserFooter = (
    <div className={styles.deleteUserFooter}>
      <button onClick={onHide}>
        <X size={18} weight="fill" /> Não
      </button>

      <button onClick={onDelete}>
        <Check size={18} weight="fill" /> Sim
      </button>
    </div>
  );

  return (
    <Dialog
      modal
      visible={isOpen}
      header={title}
      onHide={onHide}
      footer={deleteUserFooter}
      style={{ width: "450px" }}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />

        <span>
          Deseja mesmo excluir o registro <b>{subject}</b>?
        </span>
      </div>
    </Dialog>
  );
}
