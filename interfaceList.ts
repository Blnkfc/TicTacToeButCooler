
export interface Layout{
    rowCount: number,
    colCount: number,
    defaultCellValue: number
 }

export interface InitializeProps {
    layout: Layout
    order: number
    saturatedPlayfield: number[][]
}

export interface Store {
    layout: Layout,
    saturatedPlayfield: number[][]
    order:number,
    toggleOrder:Function,
    setLayout:Function,
    setSaturatedPlayfield:Function
    setCurrentCellState:Function
 }

 export interface CellProps {
    index: number,
    jdex: number,
    value: number
    
}
