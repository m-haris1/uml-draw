export function validateRelationship(from, to, type) {
  if (type === "inheritance") {
    if (from.type === "interface" && to.type === "class") {
      return false;
    }
  }
  return true;
}