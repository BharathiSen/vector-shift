import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { Cpu } from 'lucide-react';

export const LLMNode = ({ id, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode 
      id={id} 
      label="Large Language Model" 
      selected={selected}
      icon={<Cpu size={18} />}
      handles={handles}
    >
      <div className="node-content-description">
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          lineHeight: '1.5', 
          color: 'rgba(255, 255, 255, 0.7)' 
        }}>
          Process text using a foundation model. 
        </p>
        <div style={{ 
          marginTop: '12px', 
          padding: '8px', 
          background: 'rgba(255, 255, 255, 0.03)', 
          borderRadius: '8px', 
          fontSize: '11px',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Model:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>GPT-4o</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Temp:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>0.7</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
}
