'use client'
import styles from "../page.module.css"
import { useState, useEffect, ReactNode, use } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"



function Cell (props: CellProps) {
    const {order, saturatedPlayfield, skinSet, directionArray, toggleOrder, setCurrentCellState, setDirectionArray} = useStore();
    const cellState = useStore((state) => state.saturatedPlayfield[props.index][props.jdex])
    const [cellText, setCellText] = useState("")

    console.log(`DIRECTIONARRAY: ${directionArray}`)



    function isEven(order:number) {
        return (order % 2 == 0);
    }

    function hasThreeConsecutiveElements(arr: number[]) {
        console.log(`ARRAY: ${arr}`)
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
        if(!(value == 0 || value == 1) ){
            console.log("value: "+value)
            console.log("boead: "+saturatedPlayfield)

                isEven(order)?setCurrentCellState(props.index, props.jdex, 0):setCurrentCellState(props.index, props.jdex,1)
                isEven(order)?setCellText(skinSet.classic.X): setCellText(skinSet.classic.O);
                toggleOrder()
            }
        else {alert("already taken")}
        getHorizontal(props.index, props.jdex)
        getVertical(props.index, props.jdex)
        getDiagonal(props.index, props.jdex)
        getAntiDiagonal(props.index, props.jdex)
    }
    


    return <button className={styles.playfield__row__cell}  onClick={() => {doAStep(cellState)}} 
    style={{backgroundImage: "url('"+cellText.toString()+"')"}} >
        <div></div>
    </button>
}

export default Cell