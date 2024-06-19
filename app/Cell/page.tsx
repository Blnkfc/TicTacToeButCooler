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
    
    function isEven(order:number) {
        return (order % 2 == 0);
    }
    const checkDirection = (d: number, playfield: number[][], index: number, jdex: number, step: number): void => {
        // Base cases
        if (step > 2) return alert("win"); // Stop after 3 steps
        console.log("d in check: "+ d)
        // Calculate offsets based on direction
        let offsetX = -1, offsetY = -1;
        switch (d) {
            case 1: // Top-left diagonal
                offsetX = -1;
                offsetY = -1;
                break;
            case 2: // Top
                offsetY = -1;
                break;
            case 3: // Right
                offsetX = 1;
                break;
            case 4: // Bottom-right diagonal
                offsetX = 1;
                offsetY = 1;
                break;
            case 5: // Bottom
                offsetY = 1;
                break;
            case 6: // Left
                offsetX = -1;
                break;
            case 7: // Bottom-left diagonal
                offsetX = -1;
                offsetY = 1;
                break;
            case 8: // Top-right diagonal
                offsetX = 1;
                offsetY = -1;
                break;
            default:
                alert(d)
                throw new Error('Invalid direction');
        }
    
        // Check if within bounds
        if (index + offsetX >= 0 && index + offsetX < playfield.length &&
            jdex + offsetY >= 0 && jdex + offsetY < playfield[0].length) {
            // Recursively check next cell in the given direction
            if (playfield[index + offsetX][jdex + offsetY] === playfield[index][jdex] && playfield[index + offsetX][jdex + offsetY] != 2) {
                console.log(`Checking cell (${index + offsetX}, ${jdex + offsetY})`);
                checkDirection(d, playfield, index + offsetX, jdex + offsetY, step + 1);
            }
        }
    };

    for (let d = 1; d <= 8; d++) {
        console.log("d in for: "+ d)
        checkDirection(d, saturatedPlayfield, props.index, props.jdex, 0); // Start checking from cell [1][1]
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
        checkDirection(0, saturatedPlayfield, props.index, props.jdex, 0)
    }

    


    return <button className={styles.playfield__row__cell}  onClick={() => {doAStep(cellState)}} >
        <div>{cellText}</div>
    </button>
}

export default Cell