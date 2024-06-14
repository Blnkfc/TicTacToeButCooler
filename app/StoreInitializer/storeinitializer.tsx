'use client'
import { use, useRef } from "react"
import { useStore} from "../../src/store"
import { InitializeProps } from "../../interfaceList"


const StoreInitializer = ({classic_playfield, order}: InitializeProps) => {
    
    const initializeClassicPlayfield = useRef(false)
    const initializeOrder = useRef(false)
    
    
    if(!initializeClassicPlayfield.current){
        useStore.setState({classic_playfield})
        initializeClassicPlayfield.current = true
    }
    if(!initializeOrder.current){
        useStore.setState({order})
        initializeOrder.current = true
    }
    

    return null
}

export default StoreInitializer