export default function TestPage() {
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '9999'
    }}>
      <h1>TEST PAGE - This should be visible!</h1>
      <p>If you can see this, the rendering works</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
