import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useAppStore } from '../store';

export const LoopNode = ({ id, data }) => {
  const [loopVar, setLoopVar] = useState(data?.loopVar || 'item');
  const [collection, setCollection] = useState(data?.collection || 'inputArray');
  const [currName, setCurrName] = useState(data?.conditionName || id.replace('loop-', 'loop_'));
  const updateNodeField = useAppStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'loopVar', loopVar);
    updateNodeField(id, 'collection', collection);
    updateNodeField(id, 'inputName', currName);
  }, [loopVar, collection, currName]);

  return (
    <BaseNode
      id={id}
      title="Loop"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-body` },
        { id: `${id}-end` },
      ]}
      nodeName={currName}
      setNodeName={setCurrName}
    >
      <label>
        Loop Var:
        <input
          type="text"
          value={loopVar}
          onChange={(e) => setLoopVar(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
