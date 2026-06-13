import { useElementStore } from "../slice/elementSlice";
import { useRelnStore } from "../slice/relationSlice";


function getElement() {
  return useElementStore.getState().element;
}

function getReln() {
  return useRelnStore.getState().reln;
}

function getNameById(id){
  return useElementStore.getState().getNameById(id);
}

export function generateText() {
  let text = [];

  let elements = getElement();
  let relationships = getReln();

  elements.forEach((ele) => {
    text.push(
      `There is an element of type ${ele.type} and has name ${ele.name}`
    );

    ele.attributes.forEach((data) => {
      text.push(`${ele.name} has attribute ${data.name}`);
    });

    ele.methods.forEach((data) => {
      text.push(`${ele.name} has method ${data.name}`);
    });
  });

  relationships.forEach((rel) => {
    text.push(
      `There is a ${rel.type} relationship between ${getNameById(rel.from)} and ${getNameById(rel.to)}`
    );
  });

  return text.join(". ");
}