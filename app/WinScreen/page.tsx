'use client'
import Link from "next/link"
import styles from "./WinScreen.module.css"
import { useStore } from "@/src/store";
import { useEffect, useState } from "react";


const WinScreen = () => {
    const {win, order, directionArray, skinSet, setDirectionArray, toggleWin, restartOrder} = useStore()
    const [winnerSide, setWinnerSide] = useState("")

    useEffect(() => {
        if(win == true)
            isEven(order)?setWinnerSide(skinSet.classic.O): setWinnerSide(skinSet.classic.X);
    }, [win])

    function isEven(order:number) {
        return (order % 2 == 0);
    }

    const restart = () => {
        toggleWin()
        restartOrder()
        for(let i = 0; i < 4;i++){
            setDirectionArray([2], i)
        }
    }


    return <div className={styles.WinScreen}>
        <div className={styles.WinScreen__alert} id={styles.first} > Winner!!! </div>
        <div className={styles.WinScreen__display} >
            <div 
            className={styles.WinScreen__display__img} 
            style={{
                backgroundImage: "url('"+winnerSide.toString()+"')"
                }} >

                </div>
            <Link href="/" className={styles.WinScreen__display__btn} onClick={restart}  > Restart </Link>
        </div>
        <div className={styles.WinScreen__alert} id={styles.second}  > Winner!!! </div> 
        
    </div>
}


export default WinScreen