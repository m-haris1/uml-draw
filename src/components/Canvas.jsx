import { useEffect } from "react";
import Element from "./Element";
import relationEnum from "../utils/RelationEnum"
import { useState } from "react";



export default function  Canvas({
  elements,
  addAttrToClass,
  addRelationship,
  updatePosition,
  addMethodToClass,
  deleteElement
}) {
  const [selectedElements, setSelectedElements] = useState([]);
  const [dialogBox,setDialogBox]= useState(false)
  const [relnType,setRelnType]= useState(relationEnum.EXTENDS)
  useEffect(() =>{
    if(selectedElements.length === 2){
      // open dialog box
      setDialogBox(true)
    }
  },[selectedElements])


  const handleCreateRelation = () => {
    addRelationship(
      selectedElements[0],
      selectedElements[1],
      relnType
    );

    // reset everything
    setSelectedElements([]);
    setDialogBox(false);
  };
  
  
  const handleCancel = () => {
    setDialogBox(false);
    setSelectedElements([]);
  };



  return (
    <div style={{ width: "100%", height: "90vh", position: "relative", background: "#f4f4f4" }}>
      {elements.map(el => (
        <Element
          key={el.id}
          element={el}
          addAttrToClass={addAttrToClass}
          addRelationship={addRelationship}
          updatePosition={updatePosition}
          deleteElement={deleteElement}
          addMethodToClass={addMethodToClass}
          onSelectItem={(id)=>{
            setSelectedElements((prev)=>{
              if (prev.includes(id)) {
                return prev.filter(x => x !== id); // unselect
              }
              if (prev.length < 2) {
                return [...prev, id];
              }
              return prev;
            }
            )
          }}
          isSelected={selectedElements.includes(el.id)}
        />
      ))}

            {dialogBox && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "white",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          <h4>Select Relationship</h4>

          <select
            value={relnType}
            onChange={(e) => setRelnType(e.target.value)}
          >
            {Object.values(relationEnum).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleCreateRelation}>
              Add Relationship
            </button>

            <button
              onClick={handleCancel}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}