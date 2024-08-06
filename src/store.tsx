import { Layout, Store } from "@/interfaceList"
import internal from "stream"
import { create } from "zustand"




//TODO SPLIT TYPE ON STATE AND ACTIONS
export const useStore = create<Store>()((set) => ({
  layout: {
    rowCount: 3,
    colCount: 3,
    defaultCellValue: 2
  },
  modes: [
    {
      id: 0,
      name: "classic",
      isActive: true
    }
  ],
  currentActiveMode: "classic",
  saturatedPlayfield: [[0]],
  order: 0,
  skinSet: {
    classic: {
      X: "https://i.imgur.com/9h7Vqro.png",
      O: "https://i.imgur.com/vYbErYP.png"
    },
    blocker: "https://i.imgur.com/GTmEGTN.png"
  },
  directionArray: {
    horizontal: [2],
    vertical: [2],
    diagonal: [2],
    antiDiagonal: [2]
  },
  lastChangedCell: 0,
  win: false,

  toggleClassicMode: () => {
    set((state) => ({
      modes: [
        {
          id: 0,
          name: "classic",
          isActive: true
        },
        {
          id: 1,
          name: "blocker",
          isActive: false
        }
      ]
    }));
    
  },

  toggleBlockerMode: () => {
    set((state) => ({
      modes: [
        {
          id: 0,
          name: "classic",
          isActive: false
        },
        {
          id: 1,
          name: "blocker",
          isActive: true
        }
      ]
    }));
  },

  setBlocker: (saturatedPlayfield: number[][]) => {
    const rowCount = saturatedPlayfield.length
    const colCount = saturatedPlayfield[0].length
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    for(let i = 0;i <5;i++){
      const _randIndex: number = getRandomInt(0, rowCount)
      const _randJdex: number = getRandomInt(0, colCount)
      set((state) => {
        state.saturatedPlayfield[_randIndex][_randJdex] = -1;
        return {...state};
      })
    }
  },

  setCurrentActiveMode: () => {
    set((state) => ({
      currentActiveMode: state.modes.filter((m) => { m.isActive })[0].name
    }))
  },

  toggleOrder: () => set((state) => ({ order: state.order + 1 })),

  restartOrder: () => set((state) => ({ order: 0 })),

  setLayout: (rowCount: number, colCount: number, defaultCellValue: number) => set((state) => ({
    ...state,
    layout: {
      ...state.layout,
      rowCount: rowCount,
      colCount: colCount,
      defaultCellValue: defaultCellValue
    }
  })),

  setSaturatedPlayfield: (rows: number, cols: number, val: number) => {
    set((state) => {
      console.log(state.saturatedPlayfield)
      let res: number[][] = []
      for(let i=0;i<rows;i++){
        res.push([])
        for(let j=0;j<cols;j++){
          res[i].push(val)
        }
      }
      return{saturatedPlayfield: res}
    });
  },

  setCurrentCellState: (index: number, jdex: number, value: number) => {
    set((state) => {
      // Ensure the row exists
      if (!state.saturatedPlayfield[index]) {
        state.saturatedPlayfield[index] = [];
      }
      console.log(`SETCURRENTCELL FIRED, INDEX: ${index}, JSDEX: ${jdex}, VALUE: ${value}`)
      // Ensure the cell exists and update it
      state.saturatedPlayfield[index][jdex] = value;

      return { ...state };
    });
  },

  setDirectionArray: (line: number[], direction: number) => {
    switch (direction) {
      case 0: {
        set((state) => ({
          ...state,
          directionArray: {
            ...state.directionArray,
            horizontal: line
          }
        }));
        break;
      }
      case 1: {
        set((state) => ({
          ...state,
          directionArray: {
            ...state.directionArray,
            vertical: line
          }
        }));
        break;
      }
      case 2: {
        set((state) => ({
          ...state,
          directionArray: {
            ...state.directionArray,
            diagonal: line
          }
        }));
        break;
      }
      case 3: {
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

  toggleWin: () => set((state) => ({ win: !state.win }))



}))