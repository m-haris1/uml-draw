import { useState, useEffect } from "react";

export default function Element({ element, addAttrToClass,updatePosition, deleteElement }) {
  const [dragging, setDragging] = useState(false);



  function onMouseDown(e) {
    e.stopPropagation();
    setDragging(true);
  }

  function onMouseUp() {
    setDragging(false); 
  }

  function onMouseMove(e) {
    // See for performance optimization
    if (!dragging) return;
    updatePosition(element.id, e.clientX, e.clientY);
  }

  // Attach listeners to document
  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

    };
  }, [dragging]);

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        top: element?.position?.y,
        left: element?.position?.x,
        width: element?.size?.width,
        border: "2px solid black",
        background: "white",
        padding: "8px",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none"
      }}
    >
      <div style={{
        border: "2px solid black",
        padding: 0,
        margin: 0
      }}>
        {element.type}
      </div>
      <strong>{element.name}</strong>
      <div>
        Attributes :-
      </div>
      <div>
        {element.attributes.map((attr, i) => (
          <div key={i}>{attr.name}</div>
        ))}
      </div>
      {
        element.methods.map.length 
        && 
        <div>
          {element.methods.map((m, i) => (
            <div key={i}>{m.name}()</div>
          ))}
        </div>        
      }

      <button onClick={() => deleteElement(element.id)}>X</button>
      <button onClick={() => addAttrToClass(element.id)}>Add Attribute</button>
    </div>
  );
}