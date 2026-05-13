import useDiagram from "./state/useDiagram";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import ConnectionLayer from "./components/ConnectionLayer"
import { generateText } from "./utils/generator";

export default function App() {

  function handleGenerate() {
    const text = generateText();
    alert(text);
  }

  return (
    <div>
      <Toolbar
        addElement={diagram.addElement}
        generate={handleGenerate}
      />

      <Canvas
        elements={diagram.elements}
        addAttrToClass={diagram.addAttrToClass}
        addRelationship={diagram.addRelationship}
        updatePosition={diagram.updatePosition}
        deleteElement={diagram.deleteElement}
        addMethodToClass={diagram.addMethodToClass}
      />

      <ConnectionLayer
        elements={diagram.elements}
        relationships={diagram.relationships}
      />

      
    </div>
  );
}