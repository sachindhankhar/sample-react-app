import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';


export const ConditionNode = ({ id, data }) => {
  const [leftOperand, setLeftOperand] = useState(data?.leftOperand || '');
  const [operator, setOperator] = useState(data?.operator || '==');
  const [rightOperand, setRightOperand] = useState(data?.rightOperand || '');
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('condition-', 'condition_'));
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    data[field] = e.target.value;
  };

  useEffect(() => {
      updateNodeField(id, 'inputName', currName);
    }, [currName]);
  

  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true` },
        { id: `${id}-false` }
      ]}
      nodeName={currName} 
      setNodeName={setCurrName}    // pass setter to BaseNode
    >
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        <input
          type="text"
          placeholder="Left"
          value={leftOperand}
          onChange={handleChange(setLeftOperand, 'leftOperand')}
          style={{ width: 60 }}
        />
        <select
          value={operator}
          onChange={handleChange(setOperator, 'operator')}
        >
          <option value="==">==</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value=">=">&gt;=</option>
          <option value="<=">&lt;=</option>
        </select>
        <input
          type="text"
          placeholder="Right"
          value={rightOperand}
          onChange={handleChange(setRightOperand, 'rightOperand')}
          style={{ width: 60 }}
        />
      </div>

      <div style={{ fontSize: 12, marginBottom: 4 }}>Outputs:</div>

      {/* Labels for custom-positioned outputs */}
      <div style={{ position: 'absolute', right: -55, top: '57%', fontSize: 12 }}>True</div>
      <div style={{ position: 'absolute', bottom: -15, left: '35%', fontSize: 12 }}>False</div>
    </BaseNode>
  );
};
