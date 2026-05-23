import useDiagram from "./state/useDiagram";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import ConnectionLayer from "./components/ConnectionLayer"
import { generateText } from "./utils/generator";
import {useElementStore} from "./slice/elementSlice"
import {useRelnStore} from "./slice/relationSlice"


export default function App() {
  const diagram =useDiagram()
  const elements=useElementStore((state) => state.element);
  const relationships=useRelnStore((state) => state.reln)
  function handleGenerate() {
    const text = generateText(elements,relationships);
    alert(text);
  }

//   return (
// <div
//   style={{
//     height: "100vh",
//     overflow: "auto",
//     position: "relative",
//   }}
// >
//   <Toolbar
//     addElement={diagram.addElement}
//     generate={handleGenerate}
//   />

//   <Canvas
//     elements={diagram.elements}
//     addAttrToClass={diagram.addAttrToClass}
//     addRelationship={diagram.addRelationship}
//     updatePosition={diagram.updatePosition}
//     deleteElement={diagram.deleteElement}
//     addMethodToClass={diagram.addMethodToClass}
//   />

//   <ConnectionLayer
//     elements={diagram.elements}
//     relationships={diagram.relationships}
//   />
// </div>
//   );
return (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      position: "relative",
      background: "#f3f4f6",
    }}
  >
    {/* TOOLBAR (fixed on top) */}
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Toolbar
        addElement={diagram.addElement}
        generate={handleGenerate}
      />
    </div>

    {/* DYNAMIC CANVAS AREA */}
    <div
      style={{
        position: "relative",
        minWidth: "2000px",
        minHeight: "2000px",
      }}
    >
      <Canvas
        elements={elements}
        addAttrToClass={diagram.addAttrToClass}
        addRelationship={diagram.addRelationship}
        updatePosition={diagram.updatePosition}
        deleteElement={diagram.deleteElement}
        addMethodToClass={diagram.addMethodToClass}
      />

      <ConnectionLayer
        elements={elements}
        relationships={relationships}
      />
    </div>
  </div>
);
}