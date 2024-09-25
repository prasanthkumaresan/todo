import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import AddTodo from './components/AddTodo';
import SignUp from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/create" element={<AddTodo/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
