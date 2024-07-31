'use client'
import { use, useRef } from "react"
import { useStore} from "../../src/store"
import { InitializeProps } from "../../interfaceList"


const StoreInitializer = ({layout, modes, order, saturatedPlayfield, skinSet, directionArray, lastChangedCell, win}: InitializeProps) => {
    
    const initializeLayout = useRef(false)
    const initializeModes = useRef(false)
    const initializeOrder = useRef(false)
    const initializeSaturatedPlayfield = useRef(false) 
    const initializeSkinSet = useRef(false)
    const initializeDirectionArray = useRef(false)
    const initializelastChangedCell = useRef(false)
    const initializeWin = useRef(false)
    
    
    if(!initializeLayout.current){
        useStore.setState({layout})
        initializeLayout.current = true
    }
    if(!initializeModes.current){
        useStore.setState({modes})
        initializeModes.current = true
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
    if(!initializelastChangedCell.current){
        useStore.setState({lastChangedCell})
        initializelastChangedCell.current = true
    }
    if(!initializeWin.current){
        useStore.setState({win})
        initializeWin.current = true
    }


    return null
}

export default StoreInitializer