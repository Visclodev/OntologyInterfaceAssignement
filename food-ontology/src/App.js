import './stylesheet/App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ontology from './pages/Ontology';
import AboutUs from './pages/AboutUs'
import TopBar from './component/TopBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/' exact element={<Ontology/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
