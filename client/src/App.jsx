import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/Navbar';
import { useContext, useState } from 'react';
import { AuthContext } from './Context/AuthContext';
import { ChatContextProvider } from './Context/ChatContext';
import { ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from './components/Theme/Theme';
function App() {
  const [colorTheme, setColorTheme] = useState(localStorage.getItem("Theme") || "light")
  const { user } = useContext(AuthContext)

  const theme = createTheme(getDesignTokens(colorTheme));
  return (
    <ChatContextProvider user={user} >
      <ThemeProvider theme={theme} >
        <NavBar />
        <div style={{ height: "calc(100% - 40px) " }} >
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
