'use client'

import styles from "./Header.module.css"
import Image from 'next/image'

const Header = () => {

//TODO BURGER ANIMATION


    return <div className={styles.header} >
        <img src="https://i.imgur.com/1tUDbyL.png" alt="Logo" />
        <div className={styles.burger} >
            <div className={styles.burger__layer} ></div>
            <div className={styles.burger__layer} ></div>
            <div className={styles.burger__layer} ></div>
        </div>
    </div>
}

export default Header