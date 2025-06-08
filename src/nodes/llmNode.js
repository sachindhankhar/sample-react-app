import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('llm-', 'llm_'));
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
      updateNodeField(id, 'inputName', currName);
    }, [currName]);
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` },
      ]}
      outputs={[{ id: `${id}-response` }]}
      nodeName={currName} 
      setNodeName={setCurrName}  
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
