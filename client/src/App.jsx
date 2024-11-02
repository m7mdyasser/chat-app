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
import { useRef } from 'react';
import { useEffect } from 'react';
function App() {
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const divref = useRef()
  document.body.style.backgroundColor = theme.palette.primary.background
  
  useEffect(()=>{
  if(divref.current){
  divref.current.parentNode.style.height = "100vh"
  }
  },[])
  console.log(window.innerWidth);
  return (
    <ChatContextProvider user={user} >
        <ThemeProvider theme={theme} >
        <NavBar />
        <div ref={divref} style={{height: "calc(100% - 35px)"}}>
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
// cd  client 
// npm run dev
// cd server
// npm run start:dev