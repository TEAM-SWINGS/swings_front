import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostPage from './pages/PostPage';
import PostFormPage from './pages/PostFormPage';
import PostEditFormPage from './pages/PostEditFormPage';
import ChangePwdPage from './pages/ChangePwdPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/changepwdpage' element={<ChangePwdPage />} />
        <Route path='/postpage/:id' element={<PostPage />} />
        <Route path='/postformpage' element={<PostFormPage />} />
        <Route path='/edit/:id' element={<PostEditFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
