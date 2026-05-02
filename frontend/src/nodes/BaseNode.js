import React from 'react';
import { Handle } from '@xyflow/react';
import { Edit3, Trash2, Copy, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import './BaseNode.css';

export const BaseNode = ({ id, label, icon, children, handles = [], selected }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`base-node ${selected ? 'selected' : ''} node-type-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Floating Action Toolbar */}
      <div className="node-action-toolbar">
        <button className="toolbar-btn" title="Edit Properties"><Edit3 size={14} /></button>
        <button className="toolbar-btn" title="Duplicate"><Copy size={14} /></button>
        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />
        <button className="toolbar-btn delete" title="Delete Node"><Trash2 size={14} /></button>
      </div>

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
        <div className="header-left">
          {icon && (
            <div className="header-icon-wrapper">
              {React.cloneElement(icon, { size: 16 })}
            </div>
          )}
          <span className="header-title-text">{label}</span>
        </div>
        <div className="header-right">
          <MoreHorizontal size={14} color="#94a3b8" />
        </div>
      </div>

      {/* Content */}
      <div className="node-content">
        {children}
      </div>
    </motion.div>
  );
};
