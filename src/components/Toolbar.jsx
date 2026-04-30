export default function Toolbar({ addElement, generate }) {
  return (
    <div style={{ padding: "10px", background: "#222", color: "white" }}>
      <button onClick={() => addElement("class")}>Add Class</button>
      <button onClick={() => addElement("interface")}>Add Interface</button>
      <button onClick={generate}>Generate Text</button>
    </div>
  );
}