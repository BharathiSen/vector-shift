import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            width: '280px',
            background: 'rgba(255, 255, 255, 0.7)', 
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(226, 232, 240, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '32px 20px',
            height: '100%',
            overflowY: 'auto'
        }}>
            <div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>
                    VectorShift
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                    Studio Workspace
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <Category label="Input/Output">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='textFile' label='Text File' />
                </Category>

                <Category label="Processing">
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='text' label='Text Logic' />
                </Category>

                <Category label="Data & Integration">
                    <DraggableNode type='database' label='Database' />
                    <DraggableNode type='integration' label='Integration' />
                </Category>

                <Category label="Utilities">
                    <DraggableNode type='note' label='Note' />
                    <DraggableNode type='logic' label='Condition' />
                </Category>
            </div>
        </div>
    );
};

const Category = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ 
            margin: 0, 
            fontSize: '11px', 
            fontWeight: 700, 
            color: '#94a3b8', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
        }}>
            {label}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {children}
        </div>
    </div>
);
