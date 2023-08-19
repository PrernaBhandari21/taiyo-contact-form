import './App.css';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import Sidebar from './sharedComponents/Sidebar';
import Header from './sharedComponents/Header';
import Contact from "../src/components/Contact";
import ChartsAndMaps from "../src/components/ChartsAndMaps";
import { useState, useEffect } from 'react';





function App() {
  const [headerTitle, setHeaderTitle] = useState("App Title");
  useEffect(() => {
    const pathname = window.location.pathname;
    console.log("pathname : ",pathname);
    if (pathname === "/") {
      setHeaderTitle("Contact");
    } else if (pathname === "/chartsAndMap") {
      setHeaderTitle("Charts And Map");
    }
  }, [headerTitle]);

  return (
    <Router>
      <Header title={"Taiyo Assignment"} />
      <div className="grid grid-cols-[auto_1fr] justify-center gap-4 overflow-hidden p-2">
      <Sidebar />

        <div className="flex flex-col bg-gray-200">
          <Routes>
            <Route path="/" element={
            <>
             <Header title={"Contact"} />
            <Contact />
            </>} />
            <Route path="/chartsAndMap" element={
            <>
            <Header title={"Charts and Maps"}/>
            <ChartsAndMaps />
            </>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
