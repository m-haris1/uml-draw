function handleClear(clearEle,clearReln){
  clearEle();
  clearReln();
}


export default function Toolbar({ addElement, generate, clearEle, clearReln }) {
  return (
    <div style={{
      padding: "10px",
      background: "#222",
      color: "white",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      display: "flex",
      gap: "10px"
    }}>
      <button onClick={() => addElement("class")}>Add Class</button>
      <button onClick={() => addElement("interface")}>Add Interface</button>
      <button onClick={generate}>Generate Text</button>
      <button
        onClick={() => {
          clearEle();
          clearReln();
        }}
      >
        Clear
      </button>




    </div>
  );
}