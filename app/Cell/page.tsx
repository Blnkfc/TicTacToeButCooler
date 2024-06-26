'use client'
import styles from "../page.module.css"
import { useState, useEffect, ReactNode, use, useRef } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"
import { motion } from "framer-motion";






const Cell = (props: CellProps) => {
    const {order, saturatedPlayfield, skinSet, directionArray, toggleOrder, setCurrentCellState, setDirectionArray, win, toggleWin} = useStore();
    const [cellText, setCellText] = useState("")
    const [lifespan, setLifespan] = useState(0)
    const [cellState, setCellState] = useState(2)
    const cellElementRef = useRef<HTMLDivElement>(null); 
    if (typeof window!== 'undefined') 
        var audio = new Audio(`/audio/tap-notification-180637.mp3`);
    


    //GETTING THE HTML ELEMENT OF THE CELL TO GRAB IT'S STATE
    useEffect(() => {
        const cellElement = document.getElementById(props.idex.toString() + props.jdex.toString());
        if (cellElement) {
            setCellState(saturatedPlayfield[props?.idex][props?.jdex]);
        }
    }, [saturatedPlayfield]);


    useEffect(() => {
        //console.log(`CURRENT SPP IS: ${saturatedPlayfield} INDEX IS ${props.idex} JDEX IS ${props.jdex}`)
        //console.log(`CELLSTATE UPDATED TO ${saturatedPlayfield[props.idex][props.jdex]}`)
        setCellState(saturatedPlayfield[props.idex][props.jdex])
    }, [saturatedPlayfield, order])

    //UPDATING LIFESPAN AND CHENGING CELL'S VALUE DEPENDING ON THE LIFESPAN
    useEffect(() => {
        cellState!=2?setLifespan(lifespan+1):setLifespan(0)
        if(lifespan==4){
            setCurrentCellState(props.idex, props.jdex, 2)
        }
        if(lifespan==5){
           
            setCellText("")
            //console.log('CLEARED THE CELL')
        }
            
    }, [order])


    function isEven(order:number) {
        return (order % 2 == 0);
    }

    function hasThreeConsecutiveElements(arr: number[]) {
        //console.log(`ARRAY: ${arr}`)
        if (arr.length < 3) {
            return false; 
        }
        for (let i = 0; i <= arr.length - 3; i++) {
            if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
                    console.log(`TOGGLED WIN`)
                    toggleWin()
                
                    
                return true; 
            }
        }
        return false; 
    }


    const getHorizontal = (index: number, jdex:number) => {
        setDirectionArray(saturatedPlayfield[index], 0)
        
    }

    const getVertical = (index: number, jdex: number) => {
        let res = []
        for(let i = 0;i < saturatedPlayfield.length; i++){
            res.push(saturatedPlayfield[i][jdex])
        }
        setDirectionArray(res, 1)
       
    }

    const getDiagonal = (index: number, jdex: number) => {
        let res = []
        const startingIndex = index - Math.min(index, jdex)
        const startingJdex = jdex - Math.min(index, jdex)
        let stepsCount
        startingIndex >= startingJdex
        ?stepsCount =  saturatedPlayfield.length - Math.max(startingIndex, startingJdex)
        :stepsCount = saturatedPlayfield[0].length - Math.max(startingIndex, startingJdex)
        for(let i = 0; i < stepsCount; i++){
            res.push(saturatedPlayfield[startingIndex+i][startingJdex+i])
        }
        setDirectionArray(res, 2)
        
    }

    const getAntiDiagonal = (index:number, jdex:number) => {
        let res = []
        const saturatedPlayfieldCopy = JSON.parse(JSON.stringify(saturatedPlayfield));
        saturatedPlayfieldCopy.forEach((arr:number[]) => {
            arr.reverse()
        })
        const newJdex = saturatedPlayfieldCopy[index].indexOf(saturatedPlayfield[index][jdex])
        const startingIndex = index - Math.min(index, newJdex)
        const startingJdex = newJdex - Math.min(index, newJdex)
        let stepsCount
        startingIndex >= startingJdex? stepsCount =  saturatedPlayfield.length - Math.max(startingIndex, startingJdex):
        stepsCount = saturatedPlayfield[0].length - Math.max(startingIndex, startingJdex)
        for(let i = 0; i < stepsCount; i++){
            res.push(saturatedPlayfieldCopy[startingIndex+i][startingJdex+i])
        }
        setDirectionArray(res, 3)
        
    }

    
    const checkForWin = () => {
        hasThreeConsecutiveElements(directionArray.horizontal)
        hasThreeConsecutiveElements(directionArray.vertical)
        hasThreeConsecutiveElements(directionArray.diagonal)
        hasThreeConsecutiveElements(directionArray.antiDiagonal)
    }
    
    useEffect(() => {
        checkForWin()
    }, [directionArray])
    

    const doAStep = (value: number) => {
        audio.play()
        if(!(value == 0 || value == 1) ){
            console.log("value: "+value)
            console.log("boead: "+saturatedPlayfield)

                isEven(order)?setCurrentCellState(props.idex, props.jdex, 0):setCurrentCellState(props.idex, props.jdex,1)
                isEven(order)?setCellText(skinSet.classic.X): setCellText(skinSet.classic.O);
                toggleOrder()
            }
        else {alert("already taken")}
        getHorizontal(props.idex, props.jdex)
        getVertical(props.idex, props.jdex)
        getDiagonal(props.idex, props.jdex)
        getAntiDiagonal(props.idex, props.jdex)
    }



    //TODO
    //FIX THE ANIMATION FOR THE ELEMENT 
    useEffect(() => {
        if (cellElementRef.current) {
            const cellElement = cellElementRef.current;
            console.log(`CELL ELEMENT: ${cellElement}`)
            if (cellState!= 2) {
                cellElement.style.animation = "cell-spin-in 0.3s linear";
            } else {
                cellElement.style.animation = "cell-blink infinite linear";
            }
        }
    }, [cellState, cellElementRef]);
    


    return <motion.div 
    
      animate={{ 
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
       }}
      exit={{
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"
      }}
      transition={{ duration: 0.45 }}
    className={styles.playfield__row__cell}  
    onClick={() => {doAStep(cellState)}} >
        <div 
        style={{
            backgroundImage: "url('"+cellText.toString()+"')", 
            opacity:lifespan==5||lifespan==6?"50%":"100%"}} 
        id={props.idex?.toString()+props.jdex?.toString()} 
        className={cellState!=2?"playfield__row__cell__fadeIn":" "}>
            <audio src="/"></audio>
        </div>
    </motion.div>
    
}

export default Cell