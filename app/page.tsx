'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";



export default function Home() {
  const {order, saturatedPlayfield} = useStore()
  const{rowCount, colCount, defaultCellValue} = useStore((state) => (state.layout))
  const setSaturatedPlayfield = useStore((state) => state.setSaturatedPlayfield)
  const moveSkin = useStore((state) => state.skinSet)

  useEffect(() => {
    setSaturatedPlayfield(rowCount, colCount, defaultCellValue)
  },[rowCount, colCount, defaultCellValue])
 
  useEffect(() => {
      console.log(saturatedPlayfield)
  }, [saturatedPlayfield])

  const playfield = saturatedPlayfield.map
  ((el, i) => {return <div key={i}  className={styles.playfield__row}> {el.map
    ((subEl, j) => {return <Cell key={j} index={i} jdex={j}  value={subEl} />})} </div>})

    //&#9737; O
    //&#10006; X
    function isEven(order:number) {
      return (order % 2 == 0);
  }
  const [currentMove, setCurrentMove] = useState("https://i.imgur.com/9h7Vqro.png")
  useEffect(() => {
    isEven(order)?setCurrentMove(moveSkin.classic.X):setCurrentMove(moveSkin.classic.O)
  }, [order])


  return (
    <div className={styles.board}>
      <div className={styles.board__order} style={{backgroundImage: "url('"+currentMove.toString()+"')"}} ></div>
    <div className={styles.playfield}  >
      {playfield}
    </div>
    </div>
  );
}

