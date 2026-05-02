// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '36px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          background: '#fff',
          border: '1px solid #cbd5e1',
          justifyContent: 'center', 
          flexDirection: 'column',
          padding: '0 12px',
          fontSize: '13px',
          fontWeight: 500,
          color: '#475569',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#6366f1';
          e.target.style.color = '#6366f1';
          e.target.style.background = '#f5f3ff';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = '#cbd5e1';
          e.target.style.color = '#475569';
          e.target.style.background = '#fff';
        }}
      >
        <span>{label}</span>
      </div>
    );
  };