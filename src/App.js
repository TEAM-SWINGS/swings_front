import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostPage from './pages/PostPage';
import PostFormPage from './pages/PostFormPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/postpage' element={<PostPage />} />
        <Route path='/postformpage' element={<PostFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
