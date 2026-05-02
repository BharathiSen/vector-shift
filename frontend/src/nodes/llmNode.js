import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: 'response' }
  ];

  return (
    <BaseNode 
      id={id} 
      label="LLM" 
      selected={selected}
      handles={handles}
    >
      <div className="node-text">
        <span>This is a Large Language Model. Connect your prompts to start.</span>
      </div>
    </BaseNode>
  );
}
