import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '20px', 
            background: '#fff', 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Pipeline Builder</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='logic' label='Logic' />
                <DraggableNode type='integration' label='Integration' />
                <DraggableNode type='textFile' label='Text File' />
            </div>
        </div>
    );
};
