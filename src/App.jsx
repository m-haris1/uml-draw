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