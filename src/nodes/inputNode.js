import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
    updateNodeField(id, 'inputType', inputType);
  }, [currName, inputType]);

  return (
    <BaseNode
      id={id}
      title="Input"
      outputs={[{ id: `${id}-value` }]}
      nodeName={currName}          // pass current name to BaseNode
      setNodeName={setCurrName}    // pass setter to BaseNode
    >
      <label>
        Type:
        <select
          value={inputType}
          style={{ marginLeft: 10, width:'60%'}}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
