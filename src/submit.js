// submit.js

import { useReactFlow } from 'reactflow';
import axios from 'axios';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    try {
      const response = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes,
        edges,
      });

      const { num_nodes, num_edges, is_dag } = response.data;

      alert(
        `✅ Pipeline Info:\n- Nodes: ${num_nodes}\n- Edges: ${num_edges}\n- Is DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`
      );
    } catch (error) {
      console.error('❌ Error submitting pipeline:', error);
      alert('Error submitting pipeline. Please check the console for more details.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
