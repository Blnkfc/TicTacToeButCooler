
export interface CellProps {
    idex: number,
    jdex: number,
    blockerLifespan: number    
}

export interface Layout{
    rowCount: number,
    colCount: number,
    defaultCellValue: number
}

export interface Mode{
    id: number,
    name: string,
    isActive: boolean
}

export interface InitializeProps {
    layout: Layout,
    modes: Mode[],
    currentActiveMode: string,
    order: number,
    saturatedPlayfield: number[][],
    skinSet: SkinSet,
    directionArray: DirectionArray,
    lastChangedCell: number,
    win: boolean
}

export interface SkinSet{
    classic:{
        X:string,
        O:string
    },
    blocker: string
}

export interface DirectionArray{
    horizontal: number[],
    vertical: number[],
    diagonal: number[],
    antiDiagonal: number[]
}



export interface Store {
    layout: Layout,
    modes: Mode[],
    currentActiveMode: string,
    saturatedPlayfield: number[][]
    order:number,
    skinSet:SkinSet,
    directionArray: DirectionArray,
    lastChangedCell: number,
    win: boolean,

    toggleClassicMode: Function,
    toggleBlockerMode: Function,
    setBlocker: Function,
    setCurrentActiveMode: Function,
    toggleOrder:Function,
    restartOrder: Function,
    setLayout:Function,
    setSaturatedPlayfield:Function,
    setCurrentCellState:Function,
    setDirectionArray:Function,
    toggleWin:Function
 }

 