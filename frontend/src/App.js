import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PipelineToolbar />
      <div style={{ flex: 1, position: 'relative' }}>
        <PipelineUI />
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
