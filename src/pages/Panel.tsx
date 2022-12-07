import DefaultLayout from "../layouts/Default";

import { Tabs } from "../components/Tabs";
import { TabUser } from "../components/TabUser";
import { TabGroup } from "../components/TabGroup";
import { TabEvent } from "../components/TabEvent";
import { TabGame } from "../components/TabGame";
import { TabPermission } from "../components/TabPermission";
import { PermissionGate } from "../components/PermissionGate";

import styles from "./Panel.module.css";
import { useState } from "react";

enum Pages {
  TabUser,
  TabGroup,
  TabEvent,
  TabGame,
  TabPermission,
}

function Panel() {
  const [currentTab, setCurrentTab] = useState<Pages>(Pages.TabUser);

  function handleSetTab(tab: number) {
    setCurrentTab(tab);
  }

  return (
    <DefaultLayout noResponsiveContent buttonPanel={false}>
      <PermissionGate permissions={["admin-panel"]} isPage>
        <div className={styles.container}>
          <Tabs
            buttons={[
              "Usuários",
              "Grupos",
              "Eventos",
              "Sala de Jogos",
              "Permissões",
            ]}
            onClick={handleSetTab}
            currentTab={currentTab}
          >
            {currentTab === Pages.TabUser && <TabUser />}
            {currentTab === Pages.TabGroup && <TabGroup />}
            {currentTab === Pages.TabEvent && <TabEvent />}
            {currentTab === Pages.TabGame && <TabGame />}
            {currentTab === Pages.TabPermission && <TabPermission />}
          </Tabs>
        </div>
      </PermissionGate>
    </DefaultLayout>
  );
}

export default Panel;
