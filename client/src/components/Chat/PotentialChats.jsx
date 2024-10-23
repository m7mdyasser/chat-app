import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { useTheme } from "@mui/material";



const PotentialChats = () => {
  const { user } = useContext(AuthContext)
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)
  const theme = useTheme();

  return (<>
    <div className="all-users" style={{display:"none"}}>
      {potentialChats && potentialChats.map((u, index) => {
        return (
          <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
            {u.name}
            <span className={
              onlineUsers?.some((user) => user?.userId === u?._id) ? "user-online" : ""}></span>
          </div>
        )
      })}
    </div>
  </>);
}

export default PotentialChats;