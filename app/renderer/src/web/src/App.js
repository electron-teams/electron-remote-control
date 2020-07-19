import React, { useState, useEffect } from 'react';
import './App.css';
// 无法直接解析electron模块, 需要配置webpack的target
import { ipcRenderer } from 'electron'
// 1. const {ipcRenderer} = window.require('electron')


function App() {
  const [remoteCode, setRemoteCode] = useState('')
  const [localCode, setLocalCode] = useState('')
  const [controlText, setControlText] = useState('')


  useEffect(() => {
    login();
    ipcRenderer.on('control-state-change', handleControlState);
    return () => {
      ipcRenderer.removeListener('control-state-change', handleControlState);
    }
  }, []);

  const login = async () => {
    const code = await ipcRenderer.invoke('login');
    setLocalCode(code)
  }

  const startControl = async remoteCode => {
    ipcRenderer.invoke('control', remoteCode);
  }

  const handleControlState = (e, name, type) => {
    let text = ''
    if (type === 1) {
      text = `正在远程控制${name}`
    } else if (type === 2) {
      text = `被${name}控制中`
    }
    setControlText(text);
  }

  return (
    <div className="App">
      {
        controlText === '' ?
          //空标签类似于<React.Fagement></React.Fagement>
          <>
            <div>我的控制码: {localCode}:</div>
            <input type="text" value={remoteCode} onChange={e => setRemoteCode(e.target.value)} />
            <button onClick={() => startControl(remoteCode)}>确认</button>
          </>
          :
          <>
            <div>{controlText}</div>
          </>
      }
    </div>
  );
}

export default App;
