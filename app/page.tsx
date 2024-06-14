'use client'
import Image from "next/image";
import styles from "./page.module.css";
import data from "../store/state.json"
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";


export default function Home() {
  const {order} = useStore()
  const playfield = data.classic_playfield.map
  ((el, i) => {return <div key={i}  className={styles.playfield__row}> {el.map
    ((subEl, j) => {return <Cell key={j} index={i} jdex={j}  value={subEl} />})} </div>})

    //&#9737; O
    //&#10006; X
    function isEven(order:number) {
      return (order % 2 == 0);
  }
  const [currentMove, setCurrentMove] = useState("X")
  useEffect(() => {
    isEven(order)?setCurrentMove("✖"):setCurrentMove("☉")
  }, [order])


    
  return (
    <div className={styles.temp}>
      <div className={styles.order} >{currentMove}</div>
    <div className={styles.playfield} style={{}} >
      {playfield}
    </div>
    </div>
  );
}

