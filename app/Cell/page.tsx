'use client'
import styles from "../page.module.css"
import { useState, useEffect, ReactNode } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"



const Cell = (props: CellProps) => {
    const saturatedPlayfield = useStore((state) => state.saturatedPlayfield)
    const setCellState = useStore((state) => state.setCurrentCellState)
    const {order, toggleOrder} = useStore();
    const [cellText, setCellText] = useState("")
    const cellState = useStore((state) => state.saturatedPlayfield[props.index][props.jdex])
    const [line, setLine] = useState([0])


    function isEven(order:number) {
        return (order % 2 == 0);
    }

 

    const getHorizontal = (index: number, jdex:number) => {
        setLine(saturatedPlayfield[index])
    }

    const getVertical = (index: number, jdex: number) => {
        let res = []
        for(let i = 0;i < saturatedPlayfield.length; i++){
            res.push(saturatedPlayfield[i][jdex])
        }
        setLine(res)
    }

    const getDiagonal = (index: number, jdex: number) => {
        let res = []
        const startingIndex = index - Math.min(index, jdex)
        const startingJdex = jdex - Math.min(index, jdex)
        const stepsCount = Math.min(saturatedPlayfield.length-index, saturatedPlayfield[index].length - jdex) 
        for(let i = 0; i < stepsCount; i++){
            res.push(saturatedPlayfield[startingIndex+i][startingJdex+i])
        }
        setLine(res)
    }

    const getAntiDiagonal = (index:number, jdex:number) => {
        let res = []
        const startingIndex = index - Math.min(index, jdex)
        const startingJdex = jdex + Math.min(index, jdex)
        const stepsCount = Math.min(saturatedPlayfield.length-index, saturatedPlayfield[index].length - jdex)
        for(let i = 0; i < stepsCount; i++){
            res.push(saturatedPlayfield[startingIndex-i][startingJdex-i])
        }
        setLine(res)
    }
    

    const doAStep = (value: number) => {
        if(!(value == 0 || value == 1) ){
            console.log("value: "+value)
            console.log("boead: "+saturatedPlayfield)

                isEven(order)?setCellState(props.index, props.jdex, 0):setCellState(props.index, props.jdex,1)
                isEven(order)?setCellText("✖"): setCellText("☉");
                toggleOrder()
            }
        else {alert("already taken")}
        
    }

    


    return <button className={styles.playfield__row__cell}  onClick={() => {doAStep(cellState)}} >
        <div>{cellText}</div>
    </button>
}

export default Cell