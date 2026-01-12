import { createRoot } from 'react-dom/client';
import App from './Greetings';

const rootElement = document.getElementById('greetings-root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

export { App };
export default App;

