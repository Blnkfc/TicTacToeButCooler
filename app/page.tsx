'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";
import { useRouter } from "next/navigation"
import { motion } from "framer-motion";



  const Home = () => {
  const {order, saturatedPlayfield, win, directionArray, toggleWin} = useStore()
  const{rowCount, colCount, defaultCellValue} = useStore((state) => (state.layout))
  const setSaturatedPlayfield = useStore((state) => state.setSaturatedPlayfield)
  const moveSkin = useStore((state) => state.skinSet)
  const router = useRouter()

//MONITOR CHANGES OF POTENTIAL WIN ARRAY AND EXECUTE CHECK FUNCTION ON CHANGE
  useEffect(() => {
    checkForWin()
}, [directionArray])
  
function hasThreeConsecutiveElements(arr: number[]) {
  //console.log(`ARRAY: ${arr}`)
  if (arr.length < 3) {
      return false; 
  }
  for (let i = 0; i <= arr.length - 3; i++) {
      if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2] && arr[i]!=2) {
          console.log(`FIRST TOGGLED WIN: ${win}`)
          toggleWin()
          
              
          return true; 
      }
  }
  return false; 
}

// CHECK FOR THREE CONSECUTIVE CELLS IN EVERY DIRECTION 
const checkForWin = () => {
  hasThreeConsecutiveElements(directionArray.horizontal)
  hasThreeConsecutiveElements(directionArray.vertical)
  hasThreeConsecutiveElements(directionArray.diagonal)
  hasThreeConsecutiveElements(directionArray.antiDiagonal)
}

// LOAD THE LAYOUT UPON UPDATING THE STATE
  useEffect(() => {
    console.log(`DOES IT EVEN WORK ${rowCount}, ${colCount}`)
    setSaturatedPlayfield(rowCount, colCount, defaultCellValue)
  },[rowCount, colCount, defaultCellValue])
 

  // TOGGLES WIN UPON win STATE FIELD CHANGE
  useEffect(() => {
    console.log(`TOGGLED WIN: ${win}`)
    if(win)
      router.push("/WinScreen")
  }, [win])


//DEBUGGING
  useEffect(() => {
      console.log(saturatedPlayfield)
  }, [saturatedPlayfield])
  console.log(`SPP: ${saturatedPlayfield}`)

  const playfield = saturatedPlayfield.map
  ((el, i:number) => {return <div key={i}  className={styles.playfield__row}> {el.map
    ((subEl, j:number) => {return <Cell key={j} idex={i} jdex={j}  />})} </div>})

   
    function isEven(order:number) {
      return (order % 2 == 0);
  }


  const [currentMove, setCurrentMove] = useState("https://i.imgur.com/9h7Vqro.png")

// SETTING NEXT MOVE ELEMENT
  useEffect(() => {
    isEven(order)?setCurrentMove(moveSkin.classic.X):setCurrentMove(moveSkin.classic.O)
  }, [order])


  return (
    <div className={styles.board}>

      <motion.div
      animate={{ 
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        
       }}
      exit={{
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
      }}
      transition={{ duration: 0.45 }}

      className={styles.board__background}  >
        <p>Next:</p>
        <div style={{backgroundImage: "url('"+currentMove.toString()+"')"}} ></div>
      </motion.div>

      <div className={styles.board__mobile__indicator}>
       Next player/Layout: &#10138;
      </div>

    <div className={styles.playfield}  >
      {playfield}
    </div>
    </div>
  );
}

export default Home