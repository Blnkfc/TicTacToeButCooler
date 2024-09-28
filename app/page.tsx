'use client'
import styles from "./page.module.css";
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { motion } from "framer-motion";
import router from "next/router";



const Home = memo(() => {
  const { order, modes, saturatedPlayfield, directionArray, setSaturatedPlayfield, toggleWin, setBlocker } = useStore()
  const { rowCount, colCount, defaultCellValue } = useStore((state) => (state.layout))
  const moveSkin = useStore((state) => state.skinSet)
  const router = useRouter()
  const [currentMove, setCurrentMove] = useState("https://i.imgur.com/9h7Vqro.png")
  const [blockersUp, setBlockersUp] = useState(false)
  const [lifespan, setLifespan] = useState(0)

  useEffect(() => {
    if (modes.filter((m) => m.name == "blocker")[0]?.isActive && saturatedPlayfield.length > 4 && saturatedPlayfield[0].length > 4) {
      console.log(`SPP IN APP: ${saturatedPlayfield}`)
      setSaturatedPlayfield(rowCount, colCount, 2)
      setBlocker(saturatedPlayfield)
      setBlockersUp(!blockersUp)
    } else {
      setSaturatedPlayfield(rowCount, colCount, 2)
    }
  }, [modes])



  //MONITOR CHANGES OF POTENTIAL WIN ARRAY AND EXECUTE CHECK FUNCTION ON CHANGE
  useEffect(() => {
    checkForWin()
    isEven(order) ? setCurrentMove(moveSkin.classic.X) : setCurrentMove(moveSkin.classic.O)
    if (modes.filter((m) => m.name == "blocker")[0]?.isActive
      && saturatedPlayfield.length > 4
      && saturatedPlayfield[0].length > 4) {
      if (lifespan == 5) {
        setLifespan(0);
        setBlocker(saturatedPlayfield)
      } else setLifespan(lifespan + 1)
    }
  }, [order])



  function hasThreeConsecutiveElements(arr: number[]) {
    if (arr.length < 3) {
      return false;
    }
    for (let i = 0; i <= arr.length - 3; i++) {
      if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2] && arr[i] != 2) {
        toggleWin()
        router.push("/WinScreen")
        return true;
      }
    }
    return false;
  }

  // CHECK FOR THREE CONSECUTIVE CELLS IN EVERY DIRECTION 
  const checkForWin = useCallback(() => {
    hasThreeConsecutiveElements(directionArray.horizontal)
    hasThreeConsecutiveElements(directionArray.vertical)
    hasThreeConsecutiveElements(directionArray.diagonal)
    hasThreeConsecutiveElements(directionArray.antiDiagonal)
  }, [hasThreeConsecutiveElements])

  // LOAD THE LAYOUT WHEN UPDATED
  useEffect(() => {
    setSaturatedPlayfield(rowCount, colCount, defaultCellValue)
  }, [rowCount, colCount])


  const playfield = saturatedPlayfield?.map
    ((el, i: number) => {
      return <div key={i} className={styles.playfield__row}> {el.map
        ((subEl, j: number) => { return <Cell key={j} idex={i} jdex={j} blockerLifespan={lifespan} /> })} </div>
    })


  function isEven(order: number) {
    return (order % 2 == 0);
  }

  console.log(`RERENDERED`)

  return (
    <div className={styles.board}>

      <motion.div
        initial={{
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'

        }}
        animate={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'

        }}
        exit={{
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'

        }}
        transition={{
          delay: 0.2,
          duration: 0.45
        }}

        className={styles.board__background}  >
        <p>Next:</p>
        <div style={{ backgroundImage: "url('" + currentMove.toString() + "')" }} ></div>
      </motion.div>

      <div className={styles.board__mobile__indicator} id={styles.right}>
        <span> &#10138; </span> Next player
      </div>
      <div className={styles.board__mobile__indicator} id={styles.left}>
        Layout: &#10138;
      </div>


      <div className={styles.playfield}  >
        {playfield}
      </div>
    </div>
  );
})


export default Home