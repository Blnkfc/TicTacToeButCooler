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


   toggleOrder: () => set((state) => ({order: state.order + 1})),

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
       }
   }))