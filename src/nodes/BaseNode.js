import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  style = {},
  nodeName,        // current name value
  setNodeName,     // setter function to update name
}) => {
  console.log("nodeNamenodeNamenodeName",inputs)
  return (
    <div style={{ width: 200, border: '1px solid black', borderRadius: 6, padding: 10, backgroundColor: '#fff', ...style }}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`${id}-input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${input.id}`}
          style={{ top: `${(index + 1) * (100 / (inputs.length + 1))}%` }}
        />
      ))}

      {/* Title */}
      <div style={{ marginBottom: 10, fontWeight: 'bold' }}>{title}</div>
          <input
            style={{ marginBottom: 10, width: '80%', backgroundColor:'#f3f3f3',border: 'none', outline: 'none', alignItems:'center' }}
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
          />

      {/* Node Content */}
      <div>{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`${id}-output-${output.id}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: `${(index + 1) * (100 / (outputs.length + 1))}%` }}
        />
      ))}
    </div>
  );
};
