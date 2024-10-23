import { useFetchRecipientUser } from "../../Hooks/useFetchRecipient"
import avatar from '../../assets/undraw_female_avatar_efig.svg'
import { useCallback, useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchLatestMessage } from "../../Hooks/useFetchLatestMessage";
import moment from "moment";
import { Box, Typography, useTheme } from "@mui/material";


function UserChat({ chat, user }) {
  const [date, setDate] = useState(null)
  const [currentRecipient , setCurrentRecipient ] = useState(false)
  const { recipientUser } = useFetchRecipientUser(chat, user)
  const { onlineUsers, notifications, markUserNotificationsAsRead, currentChat } = useContext(ChatContext)
  const { latestMessage } = useFetchLatestMessage(chat)
  const theme = useTheme();
  const unreadNotifications = notifications.filter((n) => n.isRead === false)
  const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId == recipientUser?._id)
  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

useEffect(()=>{
  setCurrentRecipient(currentChat?.members[0] === recipientUser?._id || currentChat?.members[1] === recipientUser?._id)
},[currentChat , recipientUser?._id ])

  const truncateText = (text) => {
    let shortText = text.substring(0, 30);
    if (text.length > 30) {
      shortText = shortText + "..."
    }
    return shortText
  }

  useEffect(() => {
    const Date = (date) => {
      return moment(date).calendar(null, {
        sameDay: ' h:mm A', // صيغة عرض التاريخ لليوم
        nextDay: '[Tomorrow at] h:mm A', // صيغة عرض التاريخ للغد
        nextWeek: 'dddd [at] h:mm A', // صيغة عرض التاريخ للأسبوع القادم
        lastDay: ' dddd ', // صيغة عرض التاريخ لليوم السابق
        lastWeek: ' dddd ', // صيغة عرض التاريخ للأسبوع الماضي
        sameElse: 'DD/MM/YYYY' // صيغة عرض التاريخ لجميع الحالات الأخرى
      })
    }
    setDate(Date(latestMessage?.createdAt))
  }, [latestMessage?.createdAt])

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "rgb(110, 127, 128)",
      height: "70px",
      padding: "5px 15px",
      backgroundColor: currentRecipient ? "rgba(65,159,217,255)" : "white",
      '&:hover': {
        backgroundColor: currentRecipient ? "rgba(65,159,217,255)" : 'rgba(241,241,241,1)', // تغيير اللون عند التمرير
        cursor: 'pointer', // تغيير شكل المؤشر عند التمرير
      },
    }} onClick={() => {
      if (thisUserNotifications?.length !== 0) {
        markUserNotificationsAsRead(thisUserNotifications, notifications)
      }
    }}>

      <Box sx={{ display: "flex", gap: "8px" ,height:"100%",width:"100%"}}>
        <Box sx={{ position: "relative",display:"flex",justifyContent:"center",alignItems:"center" }} >
          <img src={avatar} height="50px" />
          <span className={isOnline ? "user-online" : ""}></span>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column",justifyContent:"center", height: "100%", gap:"8px",width:"100%" }}>
          <Box sx={{fontWeight:"bold" , color:currentRecipient ? "white" : "#004040"  }} >{recipientUser?.name}</Box>
          <Typography sx={{fontSize:"14px" ,  color:currentRecipient ? "white" : "#004040"}}>{latestMessage?.text && (<span>{truncateText(latestMessage?.text)}</span>)}</Typography>
        </Box>

      </Box>

      <Box sx={{color:currentRecipient ? "white" : "#004040", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", gap: "5px", width: "100px", height: "100%" }} >
        <Box sx={{ fontSize: "12px" }}>
          {date}
        </Box>
        <Box sx={{ width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", backgroundColor: thisUserNotifications?.length > 0 ? "rgba(65,159,217,255)" : " transparent", borderRadius: "50%", fontSize: "12px" }} className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
          {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
        </Box>
      </Box>
    </Box>
  )
}

export default UserChat