import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
const response = await fetch('https://vector-shift-backend-5x90.onrender.com/pipelines/parse', {
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
            setResult(data);
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

            {result && createPortal(
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 999999,
                    width: 'auto',
                    animation: 'slideDown 0.3s ease-out'
                }}>
                    <div style={{
                        background: '#1a1a20',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '30px',
                        minWidth: '320px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        textAlign: 'left',
                        backdropFilter: 'blur(16px)',
                    }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: 'var(--primary)' }}>
                            Pipeline Analysis Result
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>Nodes</span>
                                <span style={{ fontWeight: 600 }}>{result.num_nodes}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ color: '#94a3b8' }}>Edges</span>
                                <span style={{ fontWeight: 600 }}>{result.num_edges}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                <span style={{ color: '#94a3b8' }}>Status</span>
                                <span style={{ 
                                    fontWeight: 700, 
                                    color: result.is_dag ? '#10b981' : '#ef4444' 
                                }}>
                                    {result.is_dag ? 'DAG Established' : 'Cycle Detected'}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setResult(null)}
                            style={{
                                width: '100%',
                                marginTop: '24px',
                                padding: '12px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                        >
                            Close
                        </button>
                    </div>
                </div>,
                document.body
            )}

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
