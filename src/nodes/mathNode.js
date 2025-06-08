import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data.expression || '');
  const [result, setResult] = useState('');
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('math-', 'math_'));

  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'expression', expression);
      updateNodeField(id, 'inputName', currName);

    try {
      const evalResult = eval(expression);
      setResult(evalResult);
      updateNodeField(id, 'result', evalResult);
    } catch (err) {
      setResult('Invalid');
    }
  }, [expression, currName]);

  return (
    <BaseNode
      id={id}
      title={`Math_${id.split('-')[1]}`}
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      nodeName={currName} 
      setNodeName={setCurrName} 
    >
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="e.g., 2 + 3"
      />
      <div style={{ fontSize: 12, marginTop: 6 }}>
        <strong>Result:</strong> {result}
      </div>
    </BaseNode>
  );
};
