import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store';
import { useReactFlow, applyNodeChanges, Position, Handle, useUpdateNodeInternals } from 'reactflow';


const extractVariables = (text) => {
  const matches = [...text.matchAll(/\{\{(\w+)\}\}/g)];
  return [...new Set(matches.map((m) => m[1]))];
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || '');
  const [inputVars, setInputVars] = useState([]);

  const updateNodeField = useAppStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('text-', 'text_'));
  const textareaRef = useRef(null);
  const { setNodes } = useReactFlow();
  const nodes = useAppStore((state) => state.nodes);
  const updateNodeInternals = useUpdateNodeInternals();


  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
    updateNodeField(id, 'text', text);
    const vars = extractVariables(text);

    setInputVars(vars);

    updateNodeField(id, 'inputVars', vars);

    const updatedChanges = [
        {
          id,
          type: 'update',
          data: {
            text,
            inputVars: inputVars,
            inputName: currName,
          },
        },
      ];

      applyNodeChanges(updatedChanges, nodes);
      setTimeout(() => {
          updateNodeInternals(id);
        }, 0);

      console.log("nodes are ==> ", nodes);



    // Auto resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // set to scrollHeight
    }
  }, [text, id, updateNodeField, currName, updateNodeInternals]);


  return (
<div style={{ width: 200, border: '1px solid black', borderRadius: 6, padding: 10, backgroundColor: '#fff',}}>

        {inputVars.map((input, index) => (
          <Handle
            key={`${id}-input-${input}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input}`} // ✅ must be unique per node, per handle
            style={{ top: `${(index + 1) * (100 / (inputVars.length + 1))}%` }}
          />
        ))}

        <div style={{ marginBottom: 10, fontWeight: 'bold' }}>Text</div>


        <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text here, use {{var}}"
            className="reactflow-node-textarea"
            style={{
              resize: 'none', // disallow manual resizing to keep height controlled by script
              overflow: 'hidden', // hide scrollbars
              minHeight: '50px',
              boxSizing: 'border-box',
            }}
        />

        <Handle
            key={`${id}-output-${id}-out`}
            type="source"
            position={Position.Right}
            id={`${id}-out`}
            style={{ top: `${(1) * (100 / (2))}%` }}
        />
      </div>
  );
};


