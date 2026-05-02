import { useState } from 'react';
import { Position } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { Cpu } from 'lucide-react';
import { useStore } from '../store';

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'GPT-4o');
  const [temp, setTemp] = useState(data?.temperature || '0.7');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleModelChange = (e) => {
    setModel(e.target.value);
    updateNodeField(id, 'model', e.target.value);
  };

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
      <div className="node-field">
        <label>Model:</label>
        <select value={model} onChange={handleModelChange} className="node-select">
          <option value="GPT-4o">GPT-4o</option>
          <option value="GPT-3.5-Turbo">GPT-3.5 Turbo</option>
          <option value="Claude-3">Claude 3.5 Sonnet</option>
        </select>
      </div>
      <div className="node-field">
        <label>Temperature:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={temp} 
          onChange={(e) => {
            setTemp(e.target.value);
            updateNodeField(id, 'temperature', e.target.value);
          }}
          className="node-input"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8' }}>
          <span>Precise</span>
          <span>{temp}</span>
          <span>Creative</span>
        </div>
      </div>
    </BaseNode>
  );
}
