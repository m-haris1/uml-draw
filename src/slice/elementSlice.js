// Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useElement = (set) => ({
  element: [],

  addElement: (data) =>
    set((state) => ({
      element: [...state.element, data],
    })),

  clearElement: () => set({ element: [] }),
  
  updatePos : (id,x,y) => set((state) => ({
    element:state.element.map((el)=>
        el.id===id ?
        ({...el,position:{x,y}}):
        (el))
  })),


  addAtt: (id, attributeName) =>
  set((state) => ({
    element: state.element.map((data) =>
      data.id === id
        ? {
            ...data,
            attributes: [
              ...data.attributes,
              { name: attributeName },
            ],
          }
        : data
    ),
  })),

    addMethod: (id,methodName,methodDesc ) =>
  set((state) => ({
    element: state.element.map((data) =>
      data.id === id
        ? {
            ...data,
            attributes: [
              ...data.attributes,
              { name: methodName,
                description: methodDesc
               },
            ],
          }
        : data
    ),
  })),

  removeElement: (id) =>
    set((state) => ({
      element: state.element.filter((data) => data.id !== id),
    })),
});

export const useElementStore = create(
    persist(
        (set, get) => ({
  ...useElement(set, get),
})
,
{
    name:"element-storage"
}
    )
);