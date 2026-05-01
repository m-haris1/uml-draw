export default function ConnectionLayer({ elements, relationships }) {

  const getCenter = (node) => ({
    x: node.position.x + node.size.width / 2,
    y: node.position.y + node.size.height / 2
  });

  return (
    <svg
      style={{
        position: "absolute",
        top: 2,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0
      }}
    >
        <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
            </marker>
        </defs>
      {relationships.map((rel) => {
        const fromNode = elements.find(el => el.id === rel.from);
        const toNode = elements.find(el => el.id === rel.to);

        // ✅ Always check before using
        if (!fromNode || !toNode) return null;

        const from = getCenter(fromNode);
        const to = getCenter(toNode);
        
        return (
          <line
            key={rel.id}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="red"
            markerEnd="url(#arrow)"
          />
        );
      })}
    </svg>
  );
}