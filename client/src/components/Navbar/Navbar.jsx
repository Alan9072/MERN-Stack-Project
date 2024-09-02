import React from 'react'
import { TbError404 } from "react-icons/tb";
import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import { MdEditDocument } from "react-icons/md";

function Navbar() {
  return (
    <div className={styles.NavArea}>
        <div className={styles.todologo}><MdEditDocument /><h3>Notes</h3></div>
        <Link  className={styles.link} to="/error">
              <div className={styles.menu}><p style={{fontSize:"10px"}}>Err</p>< TbError404 style={{color:"yellow"}}/></div>
        </Link>
        
    </div>
  )
}

export default Navbar