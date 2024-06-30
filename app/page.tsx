'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";
import { useRouter } from "next/navigation"



  const Home = () => {
  const {order, saturatedPlayfield, win} = useStore()
  const{rowCount, colCount, defaultCellValue} = useStore((state) => (state.layout))
  const setSaturatedPlayfield = useStore((state) => state.setSaturatedPlayfield)
  const moveSkin = useStore((state) => state.skinSet)
  const router = useRouter()



  useEffect(() => {
    setSaturatedPlayfield(rowCount, colCount, defaultCellValue)
  },[rowCount, colCount, defaultCellValue])
 
  useEffect(() => {
    if(win)
      router.push("/WinScreen")
  }, [win])

  useEffect(() => {
      console.log(saturatedPlayfield)
  }, [saturatedPlayfield])
  console.log(`SPP: ${saturatedPlayfield}`)
  const playfield = saturatedPlayfield.map
  ((el, i:number) => {return <div key={i}  className={styles.playfield__row}> {el.map
    ((subEl, j:number) => {return <Cell key={j} idex={i} jdex={j}  />})} </div>})

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
      <div className={styles.board__background} style={{backgroundImage: "url('"+currentMove.toString()+"')"}} >

        

      </div>
    <div className={styles.playfield}  >
      {playfield}
    </div>
    </div>
  );
}

export default Home