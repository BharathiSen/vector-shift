import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { LiquidEther } from './components/LiquidEther/LiquidEther';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <LiquidEther />
      
      {/* Container for Sidebar + Content */}
      <div style={{ display: 'flex', flex: 1, zIndex: 1 }}>
        <PipelineToolbar />
        
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
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
        </div>
      </div>
    </div>
  );
}

export default App;

export default App;
