import React from 'react'
import { IoIosMenu } from "react-icons/io";
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <div className={styles.NavArea}>
        <div className={styles.todologo}><h3>ToDo</h3></div>
        <div className={styles.menu}><IoIosMenu/></div>
    </div>
  )
}

export default Navbar