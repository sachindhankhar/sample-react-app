import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const [delayMs, setDelayMs] = useState(data.delay || '');
  const [currName, setCurrName] = useState(data?.delay || id.replace('delay-', 'delay_'));

  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'delay', delayMs);
    updateNodeField(id, 'inputName', currName);

  }, [delayMs,currName]);

  return (
    <BaseNode
      id={id}
      title='Delay'
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      nodeName={currName} 
      setNodeName={setCurrName} 
    >
      <label>
        Delay (ms):
        <input
          type="number"
          value={delayMs}
          onChange={(e) => setDelayMs(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
