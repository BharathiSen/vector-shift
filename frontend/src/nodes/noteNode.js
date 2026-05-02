import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || 'Enter your note here...');
  
  return (
    <BaseNode 
      id={id} 
      label="Note" 
      selected={selected}
      handles={[]} // Notes don't need handles
    >
      <div className="node-field">
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          className="node-input"
          style={{ height: '80px', resize: 'none' }}
        />
      </div>
    </BaseNode>
  );
};
