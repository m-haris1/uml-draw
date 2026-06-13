import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useElementStore = create(
  persist(
    (set, get) => ({
      element: [],

      addElement: (data) =>
        set((state) => ({
          element: [
            ...state.element,
            {
              id: crypto.randomUUID(),
              ...data,
              attributes: data.attributes || [],
              methods: data.methods || [],
            },
          ],
        })),
      
      getNameById: (id) => {
        const element = get().element.find((el) => el.id === id);
        return element ? element.name : null;
      },
        

      clearElement: () => set({ element: [] }),

      updatePos: (id, x, y) =>
        set((state) => ({
          element: state.element.map((el) =>
            el.id === id
              ? { ...el, position: { x, y } }
              : el
          ),
        })),

      addAtt: (id, attributeName) =>
        set((state) => ({
          element: state.element.map((el) =>
            el.id === id
              ? {
                  ...el,
                  attributes: [
                    ...(el.attributes || []),
                    {
                      id: crypto.randomUUID(),
                      type: "Attribute",
                      name: attributeName,
                    },
                  ],
                }
              : el
          ),
        })),

      addMethod: (id, methodName, methodDesc) =>
        set((state) => ({
          element: state.element.map((el) =>
            el.id === id
              ? {
                  ...el,
                  methods: [
                    ...(el.methods || []),
                    {
                      id: crypto.randomUUID(),
                      type: "Method",
                      name: methodName,
                      description: methodDesc,
                    },
                  ],
                }
              : el
          ),
        })),

      removeElement: (elementId, attributeId) =>
        set((state) => ({
          element: state.element.map((el) =>
            el.id === elementId
              ? {
                  ...el,
                  attributes: el.attributes.filter(
                    (data) => data.id !== attributeId
                  ),
                }
              : el
          ),
        })),

       removeMethod : (elementId, methodId)  =>
        set((state) =>({
          element : state.element.map((el) =>
            el.id === elementId ? 
          {
            ...el,
            methods: el.methods.filter(
                    (data) => data.id !== methodId
                  ),
          }
          :
          el
          ),
        })),

        clearTheElement : (elementId) => 
          set((state) =>({
            element : state.element.filter (
              (el) => el.id !==elementId
            )
          }))
    }),
    {
      name: "element-storage",
    }
  )
);