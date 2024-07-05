'use client'

import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Image from 'next/image'
import { motion } from "framer-motion"
import {useStore} from "@/src/store"

const Header = () => {
    const {layout, setLayout, toggleWin} = useStore()
    const [rowCount, setRowCount] = useState("3")
    const [colCount, setColCount] = useState("3")
    const [settingsToggle, setSettingToggle] = useState(false)

    useEffect(() => {
        console.log(`ROWS: ${layout.rowCount.toString()}, COLS: ${layout.colCount.toString()}`)
        console.log(`OTHER ROWS: ${rowCount}, COLS: ${colCount}`)
        setLayout(Number(rowCount), Number(colCount), 2)
    }, [rowCount, colCount])
   
    const toggleSettings = () => {
        setSettingToggle(!settingsToggle)
    }
    const toggleWinCondition = () => {
        toggleWin()
    }

return <div className={styles.header} >
        <img src="https://i.imgur.com/1tUDbyL.png" alt="Logo" />
        <div className={styles.burger} onClick={toggleSettings} >
            <div className={`${settingsToggle==false?styles.burger__layer:styles.burger__layer__toggled} `} ></div>
            <div className={`${settingsToggle==false?styles.burger__layer:styles.burger__layer__toggled} `} ></div>
            <div className={`${settingsToggle==false?styles.burger__layer:styles.burger__layer__toggled} `}  ></div>
        </div>
        <motion.div
        initial={{ opacity: 0, scale:0,transform: "translateY(2.5em)", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"}}
        animate={{ opacity: settingsToggle ? 1 : 0, scale: settingsToggle ? 0 : 1, clipPath:settingsToggle?"polygon(0 0, 100% 0, 100% 100%, 0 100%)":"polygon(0 0, 100% 0, 100% 0, 0 0)"  }}
        exit={{ opacity: 0 }}
        className={styles.header__settings} 
        >
            <h2>Layout:</h2>
            <p>Rows:<br/> <input type="number" placeholder={layout.rowCount.toString()=="0"?"3":layout.rowCount.toString()} id="row" onChange={(event) => setRowCount(event.target.value)} /></p> 
            <p>Columns:<br/> <input type="number" placeholder={layout.colCount.toString()=="0"?"3":layout.colCount.toString()} id="col" onChange={(event) => setColCount(event.target.value)} /></p>
        </motion.div>
    </div>
}

export default Header