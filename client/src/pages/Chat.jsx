import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import UserChat from "../components/Chat/UserChat";
import { AuthContext } from "../Context/AuthContext";
import PotentialChats from "../components/Chat/PotentialChats";
import ChatBox from "../components/Chat/ChatBox";
import { Box, useTheme } from "@mui/material";
import SideBar from "../components/Matrial-UI/SideBar";




const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, } = useContext(ChatContext);
  const theme = useTheme();

  return (
    <Box sx={{display:"flex",height:"100%"}}>
      <SideBar>
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Box sx={{}} >
            {isUserChatsLoading && <p> Loading Chats...</p>}
            {userChats?.map((chat, index) => {
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
    </Box>);
}

export default Chat;