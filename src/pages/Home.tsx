import DefaultLayout from "../layouts/Default";

import { Welcome } from "../components/Welcome";
import { Attraction } from "../components/Attraction";
import { Championship } from "../components/Championship";
import { Schedule } from "../components/Schedule";

import styles from "./Home.module.css";

function Home() {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <Welcome />
        <Attraction />
        <Championship />
        <Schedule />
      </div>
    </DefaultLayout>
  );
}

export default Home;
