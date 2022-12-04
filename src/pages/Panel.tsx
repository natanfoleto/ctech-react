import DefaultLayout from "../layouts/Default";

import { Tabs } from "../components/Tabs";
import { TabUser } from "../components/TabUser";
import { TabGroup } from "../components/TabGroup";
import { TabEvent } from "../components/TabEvent";
import { TabGame } from "../components/TabGame";
import { TabPermission } from "../components/TabPermission";
import { PermissionGate } from "../components/PermissionGate";

import styles from "./Panel.module.css";

function Panel() {
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
          >
            <TabUser />
            <TabGroup />
            <TabEvent />
            <TabGame />
            <TabPermission />
          </Tabs>
        </div>
      </PermissionGate>
    </DefaultLayout>
  );
}

export default Panel;
