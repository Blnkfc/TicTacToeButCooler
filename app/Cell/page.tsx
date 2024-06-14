'use client'
import styles from "../page.module.css"
import { useState, useEffect, ReactNode } from "react"
import { useStore } from "@/src/store"

interface Props {
    index: number,
    jdex: number,
    value: number
    
}

const Cell = (props: Props) => {
    const playfield = useStore((state) => state.classic_playfield)
    const [cellState, setCellState] = useState(useStore((state) => state.classic_playfield[props.index][props.jdex]))
    const {order, toggleOrder} = useStore();
    const [cellText, setCellText] = useState("")
    

    function isEven(order:number) {
        return (order % 2 == 0);
    }
    const checkDirection = (d:number, playfield:number[][], index:number, jdex:number, step:number) => {
        console.log(step)
        switch(d){
            case 0:
                if (!playfield || index <= 0 || jdex <= 0 || index >= playfield.length - 1 || jdex >= playfield[0].length - 1) {
                }else{
                    if(playfield[index-1][jdex-1] === playfield[index][jdex]){
                        console.log("A:"+playfield[index-1][jdex-1])
                        console.log("B:"+playfield[index][jdex])
                        console.log("d="+d)
                        checkDirection(d, playfield, index-1, jdex-1, step+1)
                    }break;
                }
                if(step<2){
                    step++
                }else{
                    alert("aaa")
                }
            case 1:
                if (!playfield || index <= 0 || jdex <= 0 || index >= playfield.length - 1 || jdex >= playfield[0].length){
                }else{
                    if(playfield[index-1][jdex] == playfield[index][jdex]){
                        checkDirection(d, playfield, index-1, jdex, step+1)
                    }break;
                }
            case 2:
                if (!playfield || index <= 0 || jdex <= 0 || index >= playfield.length - 1 || jdex <= playfield[0].length+1){
                }else{
                    if(playfield[index-1][jdex+1] == playfield[index][jdex]){
                        checkDirection(d, playfield, index-1, jdex+1, step+1)
                    }break;
                }
        }
    }
    for(let i = 0;i < 9; i++){
        
    }


    const doAStep = (value: number) => {
        if(value == 2 ){
                isEven(order)?setCellState(0):setCellState(1)
                isEven(order)?setCellText("✖"): setCellText("☉");
                toggleOrder()
            }
        else {alert("already taken")}
        checkDirection(0, playfield, props.index, props.jdex, 0)
    }

    


    return <button className={styles.playfield__row__cell}  onClick={() => {doAStep(cellState)}} >
        <div>{cellText}</div>
    </button>
}

export default Cell