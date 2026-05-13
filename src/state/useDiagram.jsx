import { useState } from "react";
import { v4 as uuid } from "uuid";

import {useElementStore} from "../slice/elementSlice"
import {useRelnStore} from "../slice/relationSlice"

export default function useDiagram() {
    const elements = useElementStore((state) => state.element);
    const relationships= useRelnStore((state) => state.reln)
    const addEle=useElementStore((state) => state.addElement);
    const updatePos =  useElementStore((state) => state.updatePos);
    const addAttrToClassFunc=useElementStore((state) => state.addAtt);
    const deleteEle=useElementStore((state) => state.removeElement);
    const deleteReln= useRelnStore((state) => state.removeReln)
    const addReln= useRelnStore((state) => state.removeReln)
    const addMethodAndDesc= useElementStore((state) => state.addMethod);
    
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
        // setElements((prev)=>[...prev,newElement]);
        addEle(newElement)
        console.log("New Element ")
        console.log("x ",newElement.position.x)
        console.log("y ",newElement.position.y)
    }
    function addAttrToClass(id) {
        const attributeName = prompt("Please enter attribute name");
        if (!attributeName) return;
 
        addAttrToClassFunc(id,attributeName)
    }
    function addMethodToClass(id){
        const methodName = prompt("Please enter method name");
        const desc= prompt(`Please enter some description about of the method ${methodName}`)
        if(!methodName) return;
        addMethodAndDesc(id,methodName,desc)

    }
    function updatePosition(id,x,y){
        console.log("Updated Position")
        console.log("x ",x)
        console.log("y ",y)
        
        updatePos(id,x,y)
    }
    function deleteElement(id){
        // Delete Element
        deleteEle(id)

        // Delete Relationship
        deleteReln(id)
    }

    function addRelationship(from, to, type) {
    const rel = {
      id: uuid(),
      from,
      to,
      type: type
    };
    addReln(rel);
    }
    return {
        elements,
        relationships,
        addElement,
        updatePosition,
        deleteElement,
        addAttrToClass,
        addRelationship,
        addMethodToClass
    };
}