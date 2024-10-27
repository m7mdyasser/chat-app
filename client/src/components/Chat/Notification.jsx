import { useContext } from "react";
import { useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import moment from "moment";
import { Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';


const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);
  const theme = useTheme();


  const unreadNotifications = notifications.filter((n) => n.isRead === false)
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  return (
    <Box  sx={{ position: "relative" }}>
      <Box onClick={() => setIsOpen(!isOpen)}>
        <Badge badgeContent={unreadNotifications?.length} color="primary">
          <MailIcon sx={{ color: theme.palette.primary.text }} />
        </Badge>
      </Box>


      {isOpen ? (
        <Stack sx={{ position: "absolute", zIndex: "2", top: "calc(100% + 4px)", right: "0", backgroundColor: "rgba(246,246,246,255)", borderRadius: "6px", transition: "0.3", minWidth: "250px", padding: "10px 0 0 " }} >

          <Typography sx={{ color: "black", padding: "0 10px 0 10px ", cursor: "pointer" }}
            onClick={() => markAllNotificationsAsRead(notifications)}>
            Mark all as read
          </Typography>




          {modifiedNotifications?.length === 0 ? (
            <Typography className='no-select' sx={{ color: "black", padding: "5px 30px 5px 10px " }} variant="span">No notifications yet</Typography>
          ) : null}


          {modifiedNotifications &&
            modifiedNotifications.map((n, index) => {
              return (
                <Stack
                  sx={{  cursor: "pointer", color: n.isRead ? "#222" : "rgb(0, 223, 223)", transition: "padding-left 0.3" }}
                  key={index}
                  className={"notifcationmessage"}
                  onClick={() => {
                    markNotificationAsRead(n, userChats, user, notifications);
                    setIsOpen(false);
                  }}
                >
                  <Typography variant="p" sx={{ lineHeight: "1.2", }} >{`message from ${n.senderName} `}</Typography>
                  <Typography variant="span" sx={{ fontSize: "12px", }}>
                    {moment(n.date).calendar(null, {
                      sameDay: ' h:mm A', // صيغة عرض التاريخ لليوم
                      lastDay: ' dddd ', // صيغة عرض التاريخ لليوم السابق
                      lastWeek: ' dddd ', // صيغة عرض التاريخ للأسبوع الماضي
                      sameElse: 'DD/MM/YYYY' // صيغة عرض التاريخ لجميع الحالات الأخرى
                    })}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      ) : null}
    </Box>
  );
};

export default Notification;
