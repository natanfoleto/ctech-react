import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DefaultLayout from "../layouts/Default";
import { IQuest, findAllQuests } from "../services/quest";

import styles from "./Quests.module.css";

export function Quests() {
  const [quests, setQuests] = useState<IQuest[]>([]);

  useEffect(() => {
    async function findSetAllQuests() {
      const { status, message, data } = await findAllQuests();

      if (status === "error") toast.error(message);
      if (status === "success") setQuests(data);
    }

    findSetAllQuests();
  });

  return (
    <DefaultLayout>
      <div className={styles.container}>
        {quests.map((quest) => (
          <div key={quest.id} className={styles.quest}>
            <div className={styles.info}>
              <strong>{quest.name}</strong>
              <p>{quest.objective}</p>
              <p>{quest.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
}
