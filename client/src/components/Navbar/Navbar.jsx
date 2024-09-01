import React from 'react'
import { IoIosMenu  } from "react-icons/io";
import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <div className={styles.NavArea}>
        <div className={styles.todologo}><h3>ToDo</h3></div>
        <Link  className={styles.link} to="/login">
        <div className={styles.menu}><IoIosMenu/><p>Login</p></div>
        </Link>
        
    </div>
  )
}

export default Navbar