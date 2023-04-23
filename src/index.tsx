import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <main className="container mx-auto mt-10 px-8 md:px-16 lg:px-24">
    <App />
  </main>
);
