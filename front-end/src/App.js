import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./views/Home";
import Questions from "./views/Questions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/question" element={<Questions></Questions>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
