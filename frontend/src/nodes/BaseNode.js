import React from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ id, label, icon, children, handles = [], selected }) => {
  return (
    <div className={`base-node ${selected ? 'selected' : ''}`}>
      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}-${handle.type}`}
          style={{ 
            ...handle.style,
          }}
        />
      ))}

      {/* Header */}
      <div className="node-header">
        {icon && <div className="icon">{icon}</div>}
        <span className="title">{label}</span>
      </div>

      {/* Content */}
      <div className="node-content">
        {children}
      </div>
    </div>
  );
};
