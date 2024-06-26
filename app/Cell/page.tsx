'use client'
import styles from "../page.module.css"
import { useState, useEffect, ReactNode, use } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"



const Cell = (props: CellProps) => {
    const {order, saturatedPlayfield, skinSet, directionLine, toggleOrder, setCurrentCellState, setDirectionLine} = useStore();
    const cellState = useStore((state) => state.saturatedPlayfield[props.index][props.jdex])
    const [cellText, setCellText] = useState("")





    function isEven(order:number) {
        return (order % 2 == 0);
    }

    function hasThreeConsecutiveElements(arr: number[]) {
        if (arr.length < 3) {
            return false; 
        }
        for (let i = 0; i <= arr.length - 3; i++) {
            if (arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
                alert("WINNN")
                return true; 
            }
        }
        return false; 
    }


    const getHorizontal = (index: number, jdex:number) => {
        setDirectionLine(saturatedPlayfield[index])
        
    }

    const getVertical = (index: number, jdex: number) => {
        let res = []
        for(let i = 0;i < saturatedPlayfield.length; i++){
            res.push(saturatedPlayfield[i][jdex])
        }
        console.log("RESULT"+res)
        setDirectionLine(res)
       
    }

    const getDiagonal = (index: number, jdex: number) => {
        let res = []
        const startingIndex = index - Math.min(index, jdex)
        const startingJdex = jdex - Math.min(index, jdex)
        let stepsCount
        startingIndex >= startingJdex
        ?stepsCount =  saturatedPlayfield.length - Math.max(startingIndex, startingJdex)
        :stepsCount = saturatedPlayfield[0].length - Math.max(startingIndex, startingJdex)
        console.log("STEPS: "+stepsCount)
        for(let i = 0; i < stepsCount; i++){
            res.push(saturatedPlayfield[startingIndex+i][startingJdex+i])
        }
        setDirectionLine(res)
        
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
        setDirectionLine(res)
        
    }

    useEffect(() => {
        hasThreeConsecutiveElements(directionLine)
    }, [directionLine])
    
    


    const doAStep = (value: number) => {
        if(!(value == 0 || value == 1) ){
            console.log("value: "+value)
            console.log("boead: "+saturatedPlayfield)

                isEven(order)?setCurrentCellState(props.index, props.jdex, 0):setCurrentCellState(props.index, props.jdex,1)
                isEven(order)?setCellText(skinSet.classic.X): setCellText(skinSet.classic.O);
                toggleOrder()
            }
        else {alert("already taken")}
        

        for(let i = 0; i < 4; i++){
            console.log(i)
            switch(i){
                case 0:{
                    getHorizontal(props.index, props.jdex)
                    console.log(`HORIZONTAL ${directionLine}`)
                }
                case 1:{
                    getVertical(props.index, props.jdex)
                    console.log(`VERTICAL ${directionLine}`)
                }
                case 2:{
                    getDiagonal(props.index, props.jdex)
                    console.log(`DIAGONAL ${directionLine}`)
                }
                case 3:{
                    getAntiDiagonal(props.index, props.jdex)
                    console.log(`ANTIDIAGONAL ${directionLine}`)
                }
                default:{
                    return i
                }
            }
        }

        
       
        
        
    }
    


    return <button className={styles.playfield__row__cell}  onClick={() => {doAStep(cellState)}} 
    style={{backgroundImage: "url('"+cellText.toString()+"')"}} >
        <div></div>
    </button>
}

export default Cell