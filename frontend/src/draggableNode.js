import { 
  LogIn, 
  LogOut, 
  Cpu, 
  Type, 
  Database, 
  StickyNote, 
  GitBranch, 
  Zap, 
  FileText 
} from 'lucide-react';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const getIcon = (type) => {
        const iconSize = 18;
        const iconColor = "var(--primary)";
        switch(type) {
            case 'customInput': return <LogIn size={iconSize} color={iconColor} />;
            case 'customOutput': return <LogOut size={iconSize} color={iconColor} />;
            case 'llm': return <Cpu size={iconSize} color={iconColor} />;
            case 'text': return <Type size={iconSize} color={iconColor} />;
            case 'database': return <Database size={iconSize} color={iconColor} />;
            case 'note': return <StickyNote size={iconSize} color={iconColor} />;
            case 'logic': return <GitBranch size={iconSize} color={iconColor} />;
            case 'integration': return <Zap size={iconSize} color={iconColor} />;
            case 'textFile': return <FileText size={iconSize} color={iconColor} />;
            default: return <Zap size={iconSize} color={iconColor} />;
        }
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        style={{ 
          cursor: 'grab', 
          width: '100%', 
          height: '52px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0 16px',
          boxSizing: 'border-box',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none'
        }}
        draggable
      >
        <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            background: 'rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            flexShrink: 0
        }}>
            {getIcon(type)}
        </div>
        <span style={{ 
            fontSize: '13px', 
            fontWeight: 500, 
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '-0.01em'
        }}>
            {label}
        </span>
      </div>
    );
};
