import { Layout, Store } from "@/interfaceList"
import internal from "stream"
import {create} from "zustand"





export const useStore = create<Store>()((set) => ({
   layout:{
      rowCount: 3,
      colCount: 3,
      defaultCellValue: 2
   },
   saturatedPlayfield:[[0]],
   order: 0,
   skinSet: {
    classic:{
      X:"https://imgur.com/9h7Vqro",
      O:"https://imgur.com/vYbErYP"
    }
   },
   directionArray:{
    horizontal: [2],
    vertical: [2],
    diagonal: [2],
    antiDiagonal: [2]
   },
   lastChangedCell:0,
   win: false,


   toggleOrder: () => set((state) => ({order: state.order + 1})),

   restartOrder: () => set((state) => ({order: 0})),

   setLayout: (rowCount:number, colCount:number, defaultCellValue:number) => set((state) => ({
      ...state,
       layout: {
          ...state.layout,
           rowCount: rowCount,
           colCount: colCount,
           defaultCellValue: defaultCellValue
       }
   })),

   setSaturatedPlayfield: (rows: number, cols: number, val: number) => {
        let res = [];
        for (let i = 0; i < rows; i++) {
         res.push(new Array(cols).fill(val));
        }
        set(state => ({...state, saturatedPlayfield: res }));
      },

    setCurrentCellState: (index: number, jdex: number, value: number) => {
         set((state) => {
           // Ensure the row exists
           if (!state.saturatedPlayfield[index]) {
             state.saturatedPlayfield[index] = [];
           }
       
           // Ensure the cell exists and update it
           state.saturatedPlayfield[index][jdex] = value;
       
           return {...state };
         });
      },
    
    setDirectionArray: (line: number[], direction: number) => {
      switch(direction){
        case 0:{
          set((state) => ({
           ...state,
            directionArray: {
              ...state.directionArray,
              horizontal: line
            }
          }));
          break;
        }
        case 1:{
          set((state) => ({
            ...state,
             directionArray: {
               ...state.directionArray,
               vertical: line
             }
           }));
           break;
        }
        case 2:{
          set((state) => ({
            ...state,
             directionArray: {
               ...state.directionArray,
               diagonal: line
             }
           }));
           break;
        }
        case 3:{
          set((state) => ({
            ...state,
             directionArray: {
               ...state.directionArray,
               antiDiagonal: line
             }
           }));
           break;
        }
      }
      
    },
    toggleWin: () => set((state) => ({win: !state.win}))
    

  
  }))