import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function useDiagram() {
    const [elements, setElements] = useState([]);
    const [relationships,setRelationships]= useState([]);

    function addElement(type){
        const userName = prompt(`Please enter the name of ${type}`);
        const newElement= {
            id: uuid(),
            type,
            name: userName ? userName : (type=== "class" ? ("NewClass"):("NewInterface")),
            attributes: [],
            methods: [],
            position: {x:100, y:100},
            size:{ width: 150, height:100}
        };
        setElements((prev)=>[...prev,newElement]);
        console.log("New Element ")
        console.log("x ",newElement.position.x)
        console.log("y ",newElement.position.y)
    }
    function addAttrToClass(id) {
        const attributeName = prompt("Please enter attribute name");
        if (!attributeName) return;

        setElements((prev) =>
            prev.map((data) =>
                data.id === id
                    ? {
                        ...data,
                        attributes: [
                            ...data.attributes,
                            { name: attributeName }
                        ]
                    }
                    : data
            )
        );
    }
    function updatePosition(id,x,y){
        console.log("Updated Position")
        console.log("x ",x)
        console.log("y ",y)

        setElements((prev)=>
        prev.map((el)=>
        el.id===id ?
        ({...el,position:{x,y}}):
        (el))
        )
    }
    function deleteElement(id){
        // Delete Element
        setElements((prev)=>
        prev.filter((r)=> r.id !== id));

        // Delete Relationship
        setRelationships(prev =>
        prev.filter(r => r.from !== id && r.to !== id)
        );
    }

    function addRelationship(from, to, type) {
    const rel = {
      id: uuid(),
      from,
      to,
      type: type
    };
    setRelationships(prev => [...prev, rel]);
    }
    return {
        elements,
        relationships,
        addElement,
        updatePosition,
        deleteElement,
        addAttrToClass,
        addRelationship
    };
}