export function generateText(elements, relationships) {
  let text = [];
  elements.forEach(ele =>{
    text.push(`Thier is an element of type ${ele.type} and has name ${ele.name}`)
    ele.attributes.forEach((data)=>{
      text.push(`${ele.name} has attribute ${data.name}`)
    })
    ele.methods.forEach((data)=>{
      text.push(`${ele.name} has method ${data}`)
    })    
  })
  relationships.forEach(rel => {
    const from = elements.find(e => e.id === rel.from);
    const to = elements.find(e => e.id === rel.to);

    if (!from || !to) return;

    if (rel.type === "inheritance") {
      text.push(`${from.name} inherits from ${to.name}`);
    }

    if (rel.type === "association") {
      text.push(`${from.name} is associated with ${to.name}`);
    }
  });

  return text.join(". ");
}