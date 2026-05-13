import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useReln=  (set) => ({
    reln:[],
    addReln: (data) => 
        set((state) => ({
            reln:[...state.reln,data]
        })),
    
    clearReln : () => set({reln:[]}),

    removeReln : (id) =>
        set((state) =>({
            reln:state.reln.filter((data)=> data.id!==id)
        }))
    
});


export const useRelnStore = create(
    persist(
        (set,get) =>({
    ...useReln(set,get),
})
,
{
    name:"relation-storage"
}
    )
)