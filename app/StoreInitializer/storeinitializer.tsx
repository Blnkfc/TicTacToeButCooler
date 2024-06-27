'use client'
import { use, useRef } from "react"
import { useStore} from "../../src/store"
import { InitializeProps } from "../../interfaceList"


const StoreInitializer = ({layout, order, saturatedPlayfield, skinSet, directionArray}: InitializeProps) => {
    
    const initializeLayout = useRef(false)
    const initializeOrder = useRef(false)
    const initializeSaturatedPlayfield = useRef(false) 
    const initializeSkinSet = useRef(false)
    const initializeDirectionArray = useRef(false)
    
    
    if(!initializeLayout.current){
        useStore.setState({layout})
        initializeLayout.current = true
    }
    if(!initializeOrder.current){
        useStore.setState({order})
        initializeOrder.current = true
    }
    if(!initializeSaturatedPlayfield.current){
        useStore.setState({saturatedPlayfield})
        initializeSaturatedPlayfield.current = true
    }
    if(!initializeSkinSet.current){
        useStore.setState({skinSet})
        initializeSkinSet.current = true
    }
    if(!initializeDirectionArray.current){
        useStore.setState({directionArray})
        initializeDirectionArray.current = true
    }


    return null
}

export default StoreInitializer