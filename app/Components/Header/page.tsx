'use client'

import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Image from 'next/image'
import { motion } from "framer-motion"
import { useStore } from "@/src/store"
import { Mode } from "@/interfaceList"

const Header = () => {
    //IMPORTING: Layout dimensions and default values,
    //Setter function to change layout dimensions,
    //Order value of the move,
    //Current enabled mode and setter function for it,
    //Skinset of the X and O
    const { layout, modes, saturatedPlayfield, setSaturatedPlayfield, setLayout, toggleClassicMode, toggleBlockerMode, restartOrder, order } = useStore()
    const moveSkin = useStore((state) => state.skinSet)
    //Creating useState for the layout dimensions,
    //variable for toggling the settings display
    const [rowCount, setRowCount] = useState("3")
    const [colCount, setColCount] = useState("3")
    const [settingsToggle, setSettingToggle] = useState(false)
    //Usestate for the url of the current skin img
    const [currentMove, setCurrentMove] = useState("https://i.imgur.com/9h7Vqro.png")
    const [isActive, setIsActive] = useState("")
    //Check for the layout dimensions to be >= 5X5 
    const [isBigEnough, setIsBigEnough] = useState(false)



    const toggleClassic = () => {
        restartOrder()
        console.log(`SPP IN CLASS HEADER: ${saturatedPlayfield}`)
        setSaturatedPlayfield(rowCount, colCount, 2)
        toggleClassicMode()
    }
    const toggleBlocker = () => {
        restartOrder()
        console.log(`SPP IN BLOCK HEADER: ${saturatedPlayfield}`)
        console.log(`ROWS IN HEADER: ${rowCount} COLS IN HEADER: ${colCount}`)
        setLayout(rowCount, colCount, 2)
        toggleBlockerMode()
    }


    if ((layout.colCount > 4 && layout.rowCount > 4) && !isBigEnough) {
        setIsBigEnough(true)
    } else if ((layout.colCount <= 4 || layout.rowCount <= 4) && isBigEnough) {
        setIsBigEnough(false)
        toggleClassicMode()
    }



    useEffect(() => {
        setIsActive(modes.filter((m) => m.isActive)[0].name)
    }, [modes])


    //Setting the current move value after order change
    //Value is a url for the image of current skin
    //is used as a background of the cell
    useEffect(() => {
        isEven(order) ? setCurrentMove(moveSkin.classic.X) : setCurrentMove(moveSkin.classic.O)
    }, [order])

    //Setting the layout dimesion on rowCount and colCount change
    useEffect(() => {
        console.log(`ROWS: ${rowCount}, COLS: ${colCount}`)
        setLayout(Number(rowCount), Number(colCount), 2)
    }, [rowCount, colCount])

    //Toggling the display value of settings block
    const toggleSettings = () => {
        setSettingToggle(!settingsToggle)
    }

    //Check for even order value of the move
    function isEven(order: number) {
        return (order % 2 == 0);
    }






    return <div className={styles.header} >
        <a href="/">
            <img src={currentMove.toString()} alt="Logo" />
        </a>
        <div className={styles.burger} onClick={toggleSettings} >
            <div className={`${settingsToggle == false ? styles.burger__layer : styles.burger__layer__toggled} `} ></div>
            <div className={`${settingsToggle == false ? styles.burger__layer : styles.burger__layer__toggled} `} ></div>
            <div className={`${settingsToggle == false ? styles.burger__layer : styles.burger__layer__toggled} `}  ></div>
        </div>
        <motion.div
            initial={{ opacity: 1, scale: 0, transform: "translateY(56%)", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: settingsToggle ? 1 : 0, scale: settingsToggle ? 0 : 1, clipPath: settingsToggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            exit={{ opacity: 0 }}
            className={styles.header__settings}
        >
            <h2>Layout:</h2>
            <p>Rows:<br /> <input type="number" placeholder={layout.rowCount.toString() == "0" ? "3" : layout.rowCount.toString()} id="row" onChange={(event) => setRowCount(event.target.value)} /></p>
            <p>Columns:<br /> <input type="number" placeholder={layout.colCount.toString() == "0" ? "3" : layout.colCount.toString()} id="col" onChange={(event) => setColCount(event.target.value)} /></p>
            <h2>Mode:</h2>
            <section className={styles.header__settings__mode}>
                <button className={`${styles.header__settings__mode__btnEnabled} 
                                    ${!(isActive == "classic") ? "" : styles.header__settings__mode__btnActive}`}
                    onClick={toggleClassic} >1</button>
                <button title="Minimal size is 5x5" className={`${isBigEnough ? styles.header__settings__mode__btnEnabled : styles.header__settings__mode__btnDisabled}
                                    ${!(isActive == "blocker") ? "" : styles.header__settings__mode__btnActive} `}
                    onClick={toggleBlocker} >2</button>
            </section>
            <h4>Modes description:</h4>
            <details className={styles.header__settings__mode__info} >
                <summary>Classic mode</summary>
                <p>Regular tic-tac-toe with 3 in a row = win.</p>
            </details>
            <details className={styles.header__settings__mode__info} >
                <summary>Blocker mode</summary>
                <p>A mode where random amount of cells will be blocked for a couple of moves, <b>5x5 and larger board required</b>.</p>
            </details>
            <h2 className={styles.header__settings__mobile} >Next:</h2>
            <div style={{ backgroundImage: "url('" + currentMove.toString() + "')" }} ></div>
        </motion.div>
    </div>
}

//
//

export default Header