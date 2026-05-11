import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import LiquidEther from './components/LiquidEther/LiquidEther';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative', background: '#0a0a0a' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
        <LiquidEther />
      </div>     
      {/* Container for Sidebar + Content */}
      <div style={{ display: 'flex', width: '100%', zIndex: 1, background: 'transparent' }}>
        <PipelineToolbar />
        
        <main style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', background: 'transparent', overflow: 'hidden' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <PipelineUI />
          </div>
          
          <div style={{ 
            position: 'absolute', 
            bottom: '40px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 100 
          }}>
            <SubmitButton />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
