import React, { useState, useEffect } from 'react';

function Greetings() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState('');

  // Initialize from tool output if available
  useEffect(() => {
    const toolOutput = window.openai?.toolOutput;
    if (toolOutput?.greeting) {
      setGreeting(toolOutput.greeting);
    }
    if (toolOutput?.name) {
      setName(toolOutput.name);
    }
  }, []);

  // Handle updates from tool responses
  useEffect(() => {
    const updateFromResponse = (response) => {
      if (response?.structuredContent?.greeting) {
        setGreeting(response.structuredContent.greeting);
      }
      if (response?.structuredContent?.name) {
        setName(response.structuredContent.name);
      }
    };

    // Listen for tool invocations
    const handleToolInvocation = (event) => {
      const { name: toolName, payload } = event.detail ?? {};
      
      if (toolName === 'show_greeting') {
        const greetingText = payload?.greeting || 'Hello!';
        const personName = payload?.name || '';
        setGreeting(greetingText);
        setName(personName);
      }
    };

    // Listen for global state updates
    const handleSetGlobals = (event) => {
      const globals = event.detail?.globals;
      if (globals?.toolOutput?.greeting) {
        setGreeting(globals.toolOutput.greeting);
      }
      if (globals?.toolOutput?.name) {
        setName(globals.toolOutput.name);
      }
    };

    window.addEventListener('openai:tool_invocation', handleToolInvocation, { passive: true });
    window.addEventListener('openai:set_globals', handleSetGlobals, { passive: true });

    return () => {
      window.removeEventListener('openai:tool_invocation', handleToolInvocation);
      window.removeEventListener('openai:set_globals', handleSetGlobals);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Greetings</h2>
        <div style={styles.greetingBox}>
          {greeting ? (
            <div style={styles.greetingText}>
              {greeting}
              {name && <span style={styles.name}> {name}</span>}
            </div>
          ) : (
            <div style={styles.placeholder}>No greeting yet...</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100%',
    padding: '16px',
    background: '#f6f8fb',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    minHeight: '200px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: '0 0 16px',
    fontSize: '1.5rem',
    color: '#111bf5',
    fontWeight: '600',
  },
  greetingBox: {
    fontSize: '1.25rem',
    color: '#0b0b0f',
    textAlign: 'center',
    padding: '16px',
    background: '#f2f4fb',
    borderRadius: '12px',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  greetingText: {
    color: '#0b0b0f',
  },
  name: {
    color: '#111bf5',
    fontWeight: '600',
  },
  placeholder: {
    color: '#6c768a',
    fontStyle: 'italic',
  },
};

export default Greetings;

