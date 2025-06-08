import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const VariableNode = ({ id, data }) => {
  const [varName, setVarName] = useState(data?.varName || 'myVar');
  const [varValue, setVarValue] = useState(data?.varValue || '');
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('condition-', 'condition_'));
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'varName', varName);
  }, [varName]);

  useEffect(() => {
    updateNodeField(id, 'varValue', varValue);
    updateNodeField(id, 'inputName', currName);
  }, [varValue, currName]);

  return (
    <BaseNode
      id={id}
      title="Variable"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      nodeName={currName} 
      setNodeName={setCurrName}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label>
          Name:
          <input
            type="text"
            value={varName}
            onChange={(e) => setVarName(e.target.value)}
          />
        </label>
        <label>
          Value:
          <input
            type="text"
            value={varValue}
            onChange={(e) => setVarValue(e.target.value)}
          />
        </label>
      </div>
    </BaseNode>
  );
};
