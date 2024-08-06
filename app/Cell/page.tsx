'use client'
import styles from "../page.module.css"
import { useState, useEffect, useRef } from "react"
import { useStore } from "@/src/store"
import { CellProps } from "@/interfaceList"
import { motion } from "framer-motion";


const Cell = (props: CellProps) => {
    const { order, saturatedPlayfield = [[2]], skinSet, toggleOrder, setCurrentCellState, setDirectionArray } = useStore();
    const [cellText, setCellText] = useState("")
    const [lifespan, setLifespan] = useState(0)
    const [isTaken, setIsTaken] = useState(false)

    if (typeof window !== 'undefined') {
        var audio = new Audio(`/audio/tap-notification-180637.mp3`);
        var audioTaken = new Audio(`/audio/taken.mp3`)
    }


    //UPDATING LIFESPAN AND CHENGING CELL'S VALUE DEPENDING ON THE LIFESPAN
    useEffect(() => {
        saturatedPlayfield[props.idex][props.jdex] != 2 ? setLifespan(lifespan + 1) : setLifespan(0)
        if (lifespan == 5) {
            setCurrentCellState(props.idex, props.jdex, 2)
            setCellText("")
            setLifespan(0)
            console.log('CLEARED THE CELL')
        }
        if (saturatedPlayfield[props.idex][props.jdex] == -1) {
            console.log(`FIRED THE BLOCKER SKIN ${JSON.stringify(skinSet.blocker)}`)
            setCellText(skinSet?.blocker || "")
            setLifespan(props.blockerLifespan)
        } else if (saturatedPlayfield[props.idex][props.jdex] == 2)
            setCellText("")


    }, [order, saturatedPlayfield])




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


    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const doAStep = (value: number) => {
        if (!(value == 0 || value == 1 || value == -1)) {
            audio.play()
            isEven(order) ? setCurrentCellState(props.idex, props.jdex, 0) : setCurrentCellState(props.idex, props.jdex, 1)
            isEven(order) ? setCellText(skinSet.classic.X) : setCellText(skinSet.classic.O);
            toggleOrder()
        } else {
            audioTaken.play()
            setIsTaken(true)
            sleep(700).then(() => {
                setIsTaken(false)
            })
        }
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

        className={`${styles.playfield__row__cell} `}

        onClick={() => { doAStep(saturatedPlayfield[props.idex][props.jdex]) }} >
        <div
            className={`${isTaken ? styles.playfield__row__cell__taken : ""}`}
            style={{
                backgroundImage: "url('" + cellText.toString() + "')",
                opacity: lifespan == 5 || lifespan == 6 ? "50%" : "100%"
            }}
            id={props.idex?.toString() + props.jdex?.toString()}
        >
            
        </div>
    </motion.div>

}

export default Cell