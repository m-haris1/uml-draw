import useDiagram from "./state/useDiagram";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import { generateText } from "./utils/generator";

export default function App() {
  const diagram = useDiagram();

  function handleGenerate() {
    const text = generateText(
      diagram.elements,
      diagram.relationships
    );
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
      />

      
    </div>
  );
}