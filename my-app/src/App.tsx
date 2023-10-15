import React, { useEffect } from 'react';

import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import { Toolbar } from './components/Toolbar/Toolbar';
import { SettingBar } from './components/SettingBar/SettingBar';
import { Canvas } from './components/Canvas/Canvas';

import './styles/app.scss';

const App = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    if(pathname === '/') {
      navigate(`f${(+new Date()).toString(16)}`)
    }
  }, [])
  return (
    <div className="app">
      <Routes>
        <Route path='/:id' element={
          <>
            <Toolbar />
            <SettingBar />
            <Canvas />
          </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
