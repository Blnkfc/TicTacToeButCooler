
export interface CellProps {
    idex: number,
    jdex: number    
}

export interface Layout{
    rowCount: number,
    colCount: number,
    defaultCellValue: number
}

export interface Mode{
    classic: boolean,
    blocker: boolean
}

export interface InitializeProps {
    layout: Layout,
    mode: Mode,
    order: number
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
    }
}

export interface DirectionArray{
    horizontal: number[],
    vertical: number[],
    diagonal: number[],
    antiDiagonal: number[]
}



export interface Store {
    layout: Layout,
    mode: Mode,
    saturatedPlayfield: number[][]
    order:number,
    skinSet:SkinSet,
    directionArray: DirectionArray,
    lastChangedCell: number,
    win: boolean,

    setMode: Function,
    toggleOrder:Function,
    restartOrder: Function,
    setLayout:Function,
    setSaturatedPlayfield:Function,
    setCurrentCellState:Function,
    setDirectionArray:Function,
    toggleWin:Function
 }

 