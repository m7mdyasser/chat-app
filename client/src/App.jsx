import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/Navbar';
import { useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import { ChatContextProvider } from './Context/ChatContext';
import { ThemeContext } from './Context/Theme/Theme'
import { ThemeProvider } from "@mui/material";
function App() {
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  // console.log(theme.palette.primary.background);
  document.body.style.backgroundColor = theme.palette.primary.background
  return (
    <ChatContextProvider user={user} >
        <ThemeProvider theme={theme} >
        <NavBar />
        <div style={{ height: "calc(100% - 35px) " }}>
          <Routes>
            <Route path='/' element={user ? <Chat /> : <Login />} />
            <Route path='/login' element={user ? <Chat /> : <Login />} />
            <Route path='/register' element={user ? <Chat /> : <Register />} />
            <Route path='/*' element={<Navigate to='/' />} />
          </Routes >
        </div>
        </ThemeProvider>
    </ChatContextProvider>
  )
}
export default App 
