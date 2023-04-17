import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import SignIn from "./Components/SignIn";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
