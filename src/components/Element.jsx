import { useState, useEffect } from "react";
import { useElementStore } from "../slice/elementSlice";
export default function Element({ element, addAttrToClass,updatePosition, deleteElement,onSelectItem,
  isSelected, addMethodToClass }) {
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
  
  const removeMethod=useElementStore((state) => state.removeMethod);
  const rmvEle=useElementStore((state) => state.removeElement);
  return (
<div
  onMouseDown={onMouseDown}
  onClick={() => onSelectItem(element.id)}
  style={{
    position: "absolute",
    top: element?.position?.y,
    left: element?.position?.x,
    width: element?.size?.width || 220,
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: isSelected
      ? "0 0 0 2px #3b82f6, 0 8px 20px rgba(0,0,0,0.15)"
      : "0 6px 16px rgba(0,0,0,0.12)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    cursor: dragging ? "grabbing" : "grab",
    userSelect: "none",
    fontFamily: "Arial, sans-serif"
  }}
>
  {/* Header */}
  <div
    style={{
      background: "#111827",
      color: "white",
      padding: "6px 10px",
      fontSize: "12px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }}
  >
    {element.type}
  </div>

  {/* Title */}
  <div
    style={{
      padding: "8px 10px",
      fontSize: "14px",
      fontWeight: "600",
      borderBottom: "1px solid #e5e7eb"
    }}
  >
    {element.name}
  </div>

  {/* Attributes */}
  <div style={{ padding: "8px 10px" }}>
    <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280" }}>
      Attributes
    </div>

    {element.attributes?.length ? (
      element.attributes.map((attr, i) => (
      <div key={attr.id}
      style={{
                  display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 0",
      }}>
        <div
          style={{
            fontSize: "13px",
            padding: "2px 0",
            color: "#111827"
          }}
        >
          • {attr.name}
        </div>
        <button onClick={(e)=> {
          e.stopPropagation()
          rmvEle(element.id,attr.id)
          }}> X </button>
      </div>          
      ))
    ) : (
      <div style={{ fontSize: "12px", color: "#9ca3af" }}>
        No attributes
      </div>
    )}
  </div>

  {/* Methods */}
  {element.methods?.length > 0 && (
    <div
      style={{
        padding: "8px 10px",
        borderTop: "1px solid #e5e7eb"
      }}
    >
      <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280" }}>
        Methods
      </div>

      {element.methods.map((m, i) => (
        <div key={m.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 0",
        }}
        >
          <div
            style={{
              fontSize: "13px",
              padding: "2px 0",
              color: "#111827"
            }}
          >
            ⚡ {m.name}
          </div>
          <button onClick={(e)=> {
            e.stopPropagation()
            removeMethod(element.id,m.id)
            }}> X </button>
        </div>
      ))}
    </div>
  )}

  {/* Actions */}
  <div
    style={{
      display: "flex",
      gap: "6px",
      padding: "8px",
      borderTop: "1px solid #e5e7eb",
      background: "#f9fafb"
    }}
  >
    <button onClick={(e) => {
      e.stopPropagation();
      deleteElement(element.id)
      }}>
      ✕
    </button>

    <button onClick={(e) => {
      e.stopPropagation()
      addAttrToClass(element.id)
      }}>
      + Attr
    </button>

    <button onClick={(e) => {
      e.stopPropagation()
      addMethodToClass(element.id)
      }}>
      + Method
    </button>
  </div>
</div>

  );
}