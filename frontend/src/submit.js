import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Format and display the alert
            const alertMessage = `
Pipeline Analysis:
-----------------
Nodes: ${data.num_nodes}
Edges: ${data.num_edges}
Is DAG: ${data.is_dag ? '✅ Yes' : '❌ No (Contains cycles)'}
            `.trim();

            alert(alertMessage);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to analyze pipeline. Make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '14px 40px',
                    borderRadius: '16px',
                    border: 'none',
                    background: isLoading 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'var(--primary)',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: isLoading 
                        ? 'none' 
                        : '0 8px 16px -4px rgba(157, 80, 255, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    letterSpacing: '-0.01em',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(-2px) scale(1.02)';
                        e.target.style.background = 'var(--primary-hover)';
                        e.target.style.boxShadow = '0 12px 24px -6px rgba(157, 80, 255, 0.6)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.background = 'var(--primary)';
                        e.target.style.boxShadow = '0 8px 16px -4px rgba(157, 80, 255, 0.4)';
                    }
                }}
            >
                {isLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="spinner" style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite'
                        }}></div>
                        Analyzing...
                    </span>
                ) : 'Submit Pipeline'}
            </button>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
