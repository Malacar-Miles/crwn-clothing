import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/hats" element={<HatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const HatsPage = () => (
  <div><h1>HATS</h1></div>
);

export default App;
