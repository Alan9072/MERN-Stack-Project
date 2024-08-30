import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.HomeContainer}>
      <div className={styles.Homebox}>
        <Navbar />
        <div className={styles.insider}>
          <form action="">
            <input type="text" />
            <button>Add</button>
          </form>
          <div className={styles.contentinside}>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
