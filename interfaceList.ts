
export interface Layout{
    rowCount: number,
    colCount: number,
    defaultCellValue: number
 }

export interface InitializeProps {
    layout: Layout,
    order: number
    saturatedPlayfield: number[][],
    skinSet: SkinSet,
    directionArray: DirectionArray
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
    saturatedPlayfield: number[][]
    order:number,
    skinSet:SkinSet,
    directionArray: DirectionArray,


    toggleOrder:Function,
    setLayout:Function,
    setSaturatedPlayfield:Function,
    setCurrentCellState:Function,
    setDirectionArray:Function
 }

 export interface CellProps {
    index: number,
    jdex: number,
    value: number
    
}
