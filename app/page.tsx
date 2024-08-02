'use client'
import styles from "./page.module.css";
import Cell from "./Cell/page";
import { useStore } from "../src/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { motion } from "framer-motion";



const Home = () => {
  const{order, modes, saturatedPlayfield, win, directionArray, toggleWin, setBlocker} = useStore()
  const{rowCount, colCount, defaultCellValue} = useStore((state) => (state.layout))
  const setSaturatedPlayfield = useStore((state) => state.setSaturatedPlayfield)
  const moveSkin = useStore((state) => state.skinSet)
  const router = useRouter()
  const [populatedPlayField, setPopulatedPlayField] = useState<number[][]>([])

  useEffect(() => {
    if(modes.filter((m) => m.name == "blocker")[0]?.isActive && saturatedPlayfield.length>4 && saturatedPlayfield[0].length>4){
      console.log(`SPP IN APP: ${saturatedPlayfield}`)
      setBlocker(saturatedPlayfield)
    }
    setPopulatedPlayField(saturatedPlayfield)
  }, [modes, saturatedPlayfield])  

//MONITOR CHANGES OF POTENTIAL WIN ARRAY AND EXECUTE CHECK FUNCTION ON CHANGE
  useEffect(() => {
    checkForWin()
}, [directionArray])
  
function hasThreeConsecutiveElements(arr: number[]) {
  if (arr.length < 3) {
      return false; 
  }
  for (let i = 0; i <= arr.length - 3; i++) {
      if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2] && arr[i]!=2) {
          toggleWin()
          router.push("/WinScreen")
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
    console.log(saturatedPlayfield)
    setSaturatedPlayfield(rowCount, colCount, defaultCellValue)
  },[rowCount, colCount])


  const playfield = populatedPlayField.map
  ((el, i:number) => {return <div key={i}  className={styles.playfield__row}> {el.map
    ((subEl, j:number) => {return <Cell key={j} idex={i} jdex={j}  />})} </div>})

   
    function isEven(order:number) {
      return (order % 2 == 0);
  }


  const [currentMove, setCurrentMove] = useState("https://i.imgur.com/9h7Vqro.png")


//COULD TRY AND MAKE THIS CHECK IN THE DIV ITSELF TO AVOID USING THIS USEEFFECT

// SETTING NEXT MOVE ELEMENT
  useEffect(() => {
    isEven(order)?setCurrentMove(moveSkin.classic.X):setCurrentMove(moveSkin.classic.O)
  }, [order])


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
        <div style={{backgroundImage: "url('"+currentMove.toString()+"')"}} ></div>
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
}

export default Home