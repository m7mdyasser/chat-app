import { useContext, useEffect} from "react";
import { ChatContext } from "../Context/ChatContext";
import UserChat from "../components/Chat/UserChat";
import { AuthContext } from "../Context/AuthContext";
import PotentialChats from "../components/Chat/PotentialChats";
import ChatBox from "../components/Chat/ChatBox";
import { Box,  Typography, useTheme } from "@mui/material";
import SideBar from "../components/Matrial-UI/SideBar";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Stack } from "react-bootstrap";
import avatar from '../assets/vector.jpg'
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Switch from '@mui/material/Switch';
import { ThemeContext } from "../Context/Theme/Theme";


const Chat = () => {
  const { setColorTheme, colorTheme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, displayUserChats, openDrawer, setOpenDrawer ,setChatPageLoading } = useContext(ChatContext);
  const theme = useTheme();

  // ======================================================================== Drawer ==================================================================================
  const leftDrawer = (
    <div>
      <Drawer open={openDrawer} onClose={() => { setOpenDrawer(false) }} >
        <Box sx={{ width: 250, backgroundColor: theme.palette.primary.background2,height:"100%" }} role="presentation" >
          {/*  onClick={() => { setOpenDrawer(false) }} */}
          <Stack gap={3} style={{ padding: "20px 20px  10px ", alignItems: "center" }}>
            <Box sx={{}}>
              <img src={avatar} height="50px" style={{borderRadius:"50%"}} />
            </Box>
            <Box>
              <Typography sx={{color: theme.palette.primary.main}}>{user.name}</Typography>
            </Box>
          </Stack>
          <Divider sx={{ bgcolor: "#333" }} />
          <Stack>
            <Stack style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", height: "60px" }}>
              <NightsStayIcon sx={{ width: "fit-content" ,color : theme.palette.primary.text  }} />
              <Typography sx={{ width: "fit-content" ,color: theme.palette.primary.main }}> dark mode</Typography>
              <Switch checked={colorTheme === "dark" ? true : false}
              onClick={(e) => {
              e.target.checked ? (localStorage.setItem("Theme", "dark"),
              setColorTheme("dark"))
              : (localStorage.setItem("Theme", "light"),
              setColorTheme("light")) }} />
              {/* checked={localStorage.getItem("Theme") === "dark" ? true : false }  */}
            </Stack>
          </Stack>
          
        </Box>
      </Drawer>
    </div>
  )
  // ========================================================================##Drawer ==================================================================================

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {leftDrawer}
      <SideBar >
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Box sx={{ display: displayUserChats ? "block" : "none" }} >
            {isUserChatsLoading && <p> Loading Chats...</p>}
            {userChats?.map((chat, index) => {
            index === (userChats.length - 1) &&  setChatPageLoading(true) ;
              return (
                <Box key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user}></UserChat>
                </Box>
              )
            })}
          </Box>
        )}
      </SideBar>
      <ChatBox />

    </Box>
    );
}

export default Chat;