import Element from "./Element";

export default function  Canvas({
  elements,
  addAttrToClass,
  addRelationship,
  updatePosition,
  deleteElement
}) {
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
        />
      ))}
    </div>
  );
}