import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { Type } from 'lucide-react';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Detect variables like {{ variableName }}
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = async (e) => {
    const newValue = e.target.value;
    setCurrText(newValue);
    updateNodeField(id, 'text', newValue);
  };

  // Generate handles dynamically
  const handles = [
    { type: 'source', position: Position.Right, id: 'output' },
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `var-${varName}`,
      // Dynamic spacing based on number of variables
      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` }
    }))
  ];

  return (
    <BaseNode 
      id={id} 
      label="Text" 
      selected={selected}
      icon={<Type size={18} />}
      handles={handles}
    >
      <div className="node-field">
        <label>Content:</label>
        <textarea
          ref={textAreaRef}
          value={currText}
          onChange={handleTextChange}
          className="node-input"
          style={{ 
            minHeight: '40px',
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
          placeholder="Type {{variable}} to add handles..."
        />
      </div>
    </BaseNode>
  );
}
