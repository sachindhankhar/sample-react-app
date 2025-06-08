import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'outputName', currName);
    updateNodeField(id, 'outputType', outputType);
  }, [currName, outputType]);

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: `${id}-value` }]}
      nodeName={currName} 
      setNodeName={setCurrName} 
    >
      <label>
        Type:
        <select
          value={outputType}
          style={{ marginLeft: 10, width:'60%'}}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
