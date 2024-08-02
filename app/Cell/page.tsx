'use client'
import styles from "../page.module.css"
import { useState, useEffect, useRef } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"
import { motion } from "framer-motion";


const Cell = (props: CellProps) => {
    const { order, saturatedPlayfield, skinSet, toggleOrder, setCurrentCellState, setDirectionArray} = useStore();
    const [cellText, setCellText] = useState("")
    const [lifespan, setLifespan] = useState(0)
    const [cellState, setCellState] = useState(2)
    const cellElementRef = useRef<HTMLDivElement>(null);
    if (typeof window !== 'undefined')
        var audio = new Audio(`/audio/tap-notification-180637.mp3`);



    //GETTING THE HTML ELEMENT OF THE CELL TO GRAB IT'S STATE
    useEffect(() => {
        const cellElement = document.getElementById(props.idex.toString() + props.jdex.toString());
        if (cellElement) {
            setCellState(saturatedPlayfield[props?.idex][props?.jdex]);
            if(saturatedPlayfield[props?.idex][props?.jdex] == -1){
                console.log(`FIRED THE BLOCKER SKIN ${JSON.stringify(skinSet.blocker)}`)
                setCellText(skinSet?.blocker || "")
            }
        }
    }, [saturatedPlayfield[props?.idex][props?.jdex]]);


    //UPDATING LIFESPAN AND CHENGING CELL'S VALUE DEPENDING ON THE LIFESPAN
    useEffect(() => {
        cellState != 2 ? setLifespan(lifespan + 1) : setLifespan(0)
        console.log(`ORDER: ${order}`)
        if (lifespan == 4) {
            setCurrentCellState(props.idex, props.jdex, 2)
        }
        if (lifespan == 5) {

            setCellText("")
            //console.log('CLEARED THE CELL')
        }

    }, [order])



    function isEven(order: number) {
        return (order % 2 == 0);
    }




    const getHorizontal = (index: number, jdex: number) => {
        setDirectionArray(saturatedPlayfield[index], 0)

    }

    const getVertical = (index: number, jdex: number) => {
        let res = []
        for (let i = 0; i < saturatedPlayfield.length; i++) {
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
            ? stepsCount = saturatedPlayfield.length - Math.max(startingIndex, startingJdex)
            : stepsCount = saturatedPlayfield[0].length - Math.max(startingIndex, startingJdex)
        for (let i = 0; i < stepsCount; i++) {
            res.push(saturatedPlayfield[startingIndex + i][startingJdex + i])
        }
        setDirectionArray(res, 2)

    }

    const getAntiDiagonal = (index: number, jdex: number) => {
        let res = []
        const saturatedPlayfieldCopy = JSON.parse(JSON.stringify(saturatedPlayfield));
        saturatedPlayfieldCopy.forEach((arr: number[]) => {
            arr.reverse()
        })
        const newJdex = saturatedPlayfieldCopy[index].indexOf(saturatedPlayfield[index][jdex])
        const startingIndex = index - Math.min(index, newJdex)
        const startingJdex = newJdex - Math.min(index, newJdex)
        let stepsCount
        startingIndex >= startingJdex ? stepsCount = saturatedPlayfield.length - Math.max(startingIndex, startingJdex) :
            stepsCount = saturatedPlayfield[0].length - Math.max(startingIndex, startingJdex)
        for (let i = 0; i < stepsCount; i++) {
            res.push(saturatedPlayfieldCopy[startingIndex + i][startingJdex + i])
        }
        setDirectionArray(res, 3)

    }


    const doAStep = (value: number) => {
        audio.play()
        if (!(value == 0 || value == 1|| value == -1)) {
            console.log("value: " + value)
            console.log("boead: " + saturatedPlayfield)

            isEven(order) ? setCurrentCellState(props.idex, props.jdex, 0) : setCurrentCellState(props.idex, props.jdex, 1)
            isEven(order) ? setCellText(skinSet.classic.X) : setCellText(skinSet.classic.O);
            toggleOrder()
        } else { alert("already taken") }
        getHorizontal(props.idex, props.jdex)
        getVertical(props.idex, props.jdex)
        getDiagonal(props.idex, props.jdex)
        getAntiDiagonal(props.idex, props.jdex)
    }


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

        onClick={() => { doAStep(cellState) }} >
        <div
            style={{
                backgroundImage: "url('" + cellText.toString() + "')",
                opacity: lifespan == 5 || lifespan == 6 ? "50%" : "100%"
            }}
            id={props.idex?.toString() + props.jdex?.toString()}
            className={cellState != 2 ? "playfield__row__cell__fadeIn" : " "}>
            <audio src="/" preload="auto"></audio>
        </div>
    </motion.div>

}

export default Cell