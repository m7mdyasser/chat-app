import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../Utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [registerError, setRegisterError] = useState(null)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user))
  }, [])
  // هذه الداله المسئوله عن اخذ بيانات التسجيل لاول مره من حقول الادخال 
  // ======================================================================== تخزين البيانات ==================================================================================
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info)
  }, [])
  // ========================================================================##تخزين البيانات ==================================================================================
  // ======================================================================== تخزين البيانات ==================================================================================
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info)
  }, [])
  // ========================================================================##تخزين البيانات ==================================================================================
  // هذه الداله المسئوله عن انشاء اكونت للمستخدم 
  // ========================================================================اكونت جديد register==================================================================================
  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true)
    setRegisterError(null)
    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);
  // ========================================================================##اكونت جديد register==================================================================================
  // ======================================================================== Login ==================================================================================

  const loginUser = useCallback(async (e) => {
    e.preventDefault()
    setIsLoginLoading(true)
    setLoginError(null)
    const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
    setIsLoginLoading(false)

    if (response.error) {
      return setLoginError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [loginInfo])
  // ========================================================================##Login ==================================================================================
  // ======================================================================== Logout ==================================================================================
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User")
    setUser(null)
  }, [])
  // ========================================================================##Logout ==================================================================================
  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      registerInfo,
      updateRegisterInfo,
      registerUser,
      registerError,
      isRegisterLoading,
      loginInfo,
      updateLoginInfo,
      loginUser,
      loginError,
      isLoginLoading,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}