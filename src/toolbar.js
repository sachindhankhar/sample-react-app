// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
            <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* New nodes */}
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='loop' label='Loop' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='variable' label='Variable' />
            </div>
        </div>
    );
};
