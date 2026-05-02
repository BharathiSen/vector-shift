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
        const iconColor = "#6366f1";
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
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        style={{ 
          cursor: 'grab', 
          width: '100%', 
          height: '48px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '14px',
          background: '#fff',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          padding: '0 16px',
          fontSize: '14px',
          fontWeight: 600,
          color: '#334155',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          gap: '12px',
          boxSizing: 'border-box'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#6366f1';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(99, 102, 241, 0.15)';
          e.currentTarget.style.background = '#fefeff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.02)';
          e.currentTarget.style.background = '#fff';
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'rgba(99, 102, 241, 0.08)',
          width: '32px',
          height: '32px',
          borderRadius: '8px'
        }}>
          {getIcon(type)}
        </div>
        <span>{label}</span>
      </div>
    );
};