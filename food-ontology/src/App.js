import './stylesheet/App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ontology from './pages/Ontology';
import AboutUs from './pages/AboutUs';
import MealPage from './pages/MealPage';
import TopBar from './component/TopBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/' exact element={<Ontology/>} />
          <Route path='/aboutUs' element={<AboutUs/>} />
          <Route path='/mealpage' element={<MealPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
