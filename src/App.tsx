import { useState } from 'react';
import { TokenEditor } from './components/TokenEditor';
import { JsonEditor } from './components/JsonEditor';
import { useTheme } from './hooks/useTheme';
import './App.css';

function App() {
  const { theme, updateTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'tokens' | 'json'>('tokens');

  return (
    <div className="app-layout">
      <main className="panel editor-panel">
        <div className="tab-header">
          <button
            className={`tab-button ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            Token Editor
          </button>
          <button
            className={`tab-button ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            JSON Editor
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'tokens' && (
            <TokenEditor theme={theme} onThemeChange={updateTheme} />
          )}
          {activeTab === 'json' && (
            <JsonEditor theme={theme} onThemeChange={updateTheme} />
          )}
        </div>
      </main>
      
      <aside className="panel mobile-preview">
        <h2>Mobile Preview</h2>
        {/* TODO: Mobile preview UI goes here */}
      </aside>
    </div>
  );
}

export default App;
