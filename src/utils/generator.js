export function generateText(elements,relationships) {
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
    text.push(`Thier is a ${rel.type} relationship between ${rel.from} and ${rel.to}`)
  });

  return text.join(". ");
}