import internal from "stream"
import {create} from "zustand"

interface Store {
   classic_playfield: number[][],
   order:number,
   toggleOrder:Function
}

export const useStore = create<Store>()((set) => ({
   classic_playfield:[],
   order: 0,
   toggleOrder: () => set((state) => ({order: state.order + 1})),
   
}))