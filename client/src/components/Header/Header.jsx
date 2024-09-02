import React from 'react'
import styles from './Header.module.css'

function Header(props) {
  return (
    <div className={styles.headerarea}>{props.value}</div>
  )
}

export default Header