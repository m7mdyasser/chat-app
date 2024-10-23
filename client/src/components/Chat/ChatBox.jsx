import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchRecipientUser } from "../../Hooks/useFetchRecipient";
import moment from "moment";
import EmojiPicker from 'emoji-picker-react';
import { Box, IconButton, Typography, useTheme, Stack } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import ContactsIcon from '@mui/icons-material/Contacts';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false)
  const [emoji, setEmoji] = useState('')
  const scroll = useRef()
  const theme = useTheme();

  // const onEmojiClick = (event, emojiObject) => {
  // console.log(emojiObject.emoji);
  //   // setTextMessage(textMessage + emojiObject.emoji);
  // };
  useEffect(()=>{
    setTextMessage(textMessage + emoji )
  },[emoji])
  
  useEffect(() => {
    setTimeout(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, 0)
  }, [messages])

  const Date = useCallback((date) => {
    return moment(date).calendar(null, {
      sameDay: 'h:mm A', // صيغة عرض التاريخ لليوم
      nextDay: 'h:mm A', // صيغة عرض التاريخ للغد
      nextWeek: 'h:mm A', // صيغة عرض التاريخ للأسبوع القادم
      lastDay: 'h:mm A ', // صيغة عرض التاريخ لليوم السابق
      lastWeek: 'h:mm A ', // صيغة عرض التاريخ للأسبوع الماضي
      sameElse: 'h:mm A' // صيغة عرض التاريخ لجميع الحالات الأخرى
    })
  }, [])

  if (!recipientUser) {
    return (
      <Stack sx={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Typography style={{ textAlign: "center", width: "100%" }}>
          No conversation selected yet
        </Typography>
      </Stack>
    );
  }
  if (isMessagesLoading) {
    return (
      <Stack sx={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Typography style={{ textAlign: "center", width: "100%" }}>
          Loading Chat...
        </Typography>
      </Stack>
    );
  }





  return (


    <Stack sx={{ height: "100%", width: "100%", backgroundColor: "transparent", alignItems: "flex-start" }}  >



      <Box sx={{ height: "60px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", color: "black", borderWidth: " 0 0 1px 0", borderColor: "rgba(231,231,231,255)", borderStyle: "solid" }}>
        <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "bold" }}>{recipientUser.name}</Typography>
          <Typography sx={{ color: "#777" }}>last seen recently</Typography>
        </Box>
        <Stack direction="row-reverse" spacing={1}>
          <IconButton >
            <MoreVertIcon />
          </IconButton>
          <IconButton >
            <ContactsIcon />
          </IconButton>
          <IconButton >
            <PhoneIcon />
          </IconButton>
          <IconButton >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Box>

      <Stack className="scroll-container" direction={"column-reverse"} sx={{ flex: "1", padding: "0 80px 10px ", width: "100%", backgroundColor: "#263159", overflow: "scroll" }}>
        <Stack gap={1}>
          {messages &&
            messages.map((message, index) => (
              <Stack
                key={index}
                ref={index === messages.length - 1 ? scroll : null}
                sx={{ alignItems: message?.senderId === user?._id ? "flex-end " : "flex-start", }}>
                <Stack sx={{ backgroundColor: message?.senderId === user?._id ? "rgba(231,245,213,255)" : "rgba(255,255,255,255)", color: "black", padding: "4px 14px", borderRadius: "10px", alignItems: message?.senderId === user?._id ? "flex-end" : "flex-start" }}>
                  <Box sx={{ fontSize: "16px" }}  >{message.text}</Box>
                  <Box sx={{ fontSize: "12px", lineHeight: "1", color: "#777" }}  >{Date(message.createdAt)}</Box>
                </Stack>

              </Stack>
            )
            )}
        </Stack>
      </Stack>




      <Box sx={{ width: "100%", position: "relative" }}>
        <input
          onKeyDown={(e) => { e.key === 'Enter' && sendTextMessage(textMessage, user, currentChat._id, setTextMessage) }}
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          placeholder="Write a message..."
          style={{ width: "100%", height: "45px", outline: "none", padding: "5px 50px", border: "none", borderWidth: "1px 0 0  0", borderColor: "rgba(231,231,231,255)", borderStyle: "solid" }} />
        <IconButton
          onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
          sx={{ position: "absolute", top: "50%", right: "10px", transform: 'translateY(-50%)' }} >
          <SendRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => setShowPicker(!showPicker)}
          sx={{ position: "absolute", top: "50%", left: "0", transform: 'translateY(-50%)' }} >
          <SentimentSatisfiedAltRoundedIcon />
        </IconButton>
        {showPicker && <Box sx={{ position: 'absolute', bottom: "50px", left: "0" }}>
          <EmojiPicker
          searchDisabled
          lazyLoadEmojis ={false}
          emojiStyle="twitter"
          onEmojiClick={(e) => {setEmoji(e.emoji)}} />
        </Box>}
      </Box>
    </Stack>
  );
};

export default ChatBox;
