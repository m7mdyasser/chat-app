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
import ScrollBar from "../Matrial-UI/ScrollBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage, setCurrentChat } = useContext(ChatContext);
  const [recipientUserOn, setRecipientUserOn] = useState(null)
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false)
  const [emoji, setEmoji] = useState('')
  const scroll = useRef()
  const textareaRef = useRef(null);
  const theme = useTheme();

useEffect(()=>{
  setRecipientUserOn(recipientUser)
},[recipientUser])

  useEffect(() => {
    setTextMessage(textMessage + emoji)
  }, [emoji])

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

  if (!recipientUserOn) {
    return (
      <Stack sx={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
          display: "none",
        }
      }}>
        <Typography style={{ textAlign: "center", width: "100%", color: theme.palette.primary.main }}>
          No conversation selected yet
        </Typography>
      </Stack>
    );
  }
  if (isMessagesLoading) {
    return (
      <Stack sx={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Typography style={{ textAlign: "center", width: "100%" }}>
          Loading Chat...
        </Typography>
      </Stack>
    );
  }

  return (


    <Stack sx={{
      height: "100%",
      display: currentChat ? "flex" : "none",
      width: "100%",
      alignItems: "flex-start",
      [theme.breakpoints.down("xl")]: {
        minWidth: "700px",
      },
      [theme.breakpoints.down("lg")]: {
        minWidth: "500px",
      },
      [theme.breakpoints.down("md")]: {
        minWidth: "100%",
      }
    }}  >



      <Stack
        direction={"row"}
        sx={{
          height: "60px",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.primary.background2,
          borderWidth: " 0 0 1px 0",
          borderColor: theme.palette.primary.border,
          borderStyle: "solid"
        }}>

        <Stack direction={"row"} sx={{ ml: 2, alignItems: "center" }}>
          <ArrowBackIcon
            onClick={() => { setCurrentChat(null) , setRecipientUserOn(null) }}
            sx={{
              display: "none",
              mr: 1,
              cursor: "pointer",
              color: theme.palette.primary.text,
              '&:hover': {
                color: theme.palette.secondary.textHover,
              },
              [theme.breakpoints.down("md")]: {
                display: "block"
              },
            }} />
          <Stack >
            <Typography sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>{recipientUser.name}</Typography>
            <Typography sx={{ color: theme.palette.primary.text }}>last seen recently</Typography>
          </Stack>
        </Stack>


        <Stack direction="row-reverse" spacing={1}>
          <IconButton sx={{ color: theme.palette.primary.text, '&:hover': { color: theme.palette.secondary.textHover } }} >
            <MoreVertIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.text, '&:hover': { color: theme.palette.secondary.textHover } }}>
            <ContactsIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.text, '&:hover': { color: theme.palette.secondary.textHover } }}>
            <PhoneIcon />
          </IconButton>
          <IconButton sx={{ color: theme.palette.primary.text, '&:hover': { color: theme.palette.secondary.textHover } }}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>





      <Box sx={{ width: "100%", height: "calc(100% - 94px )", }}>
        <Stack
          direction={"column-reverse"}
          sx={{
            padding: "10px 50px  ",
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.primary.background,
          }}>
          <ScrollBar mode={theme.palette.mode} dir={"reverse"} breakpoint={600}  />
          <Stack gap={1}>
            {messages &&
              messages.map((message, index) => {
                return (
                  <Stack
                    key={index}
                    ref={index === messages.length - 1 ? scroll : null}
                    sx={{ alignItems: message?.senderId === user?._id ? "flex-end " : "flex-start", }}>
                    <Stack sx={{
                      maxWidth: "400px",
                      backgroundColor: message?.senderId === user?._id ? theme.palette.primary.selfMessage : theme.palette.primary.nonSelfMessage,
                      color: theme.palette.primary.main,
                      padding: "4px 14px",
                      borderRadius: "10px",
                      alignItems: message?.senderId === user?._id ? "flex-end" : "flex-start"
                    }}>
                      <Box className="long-text"
                        sx={{
                          fontSize: "16px",
                          display: "flex",
                          overflow: "hidden",
                          flexWrap: "wrap",
                          width: "100%",
                        }}>{message.text}</Box>
                      <style>{`.long-text {word-break: break-all;}`}</style>
                      <Box sx={{ fontSize: "12px", lineHeight: "1", color: theme.palette.primary.text }}  >{Date(message.createdAt)}</Box>
                    </Stack>
                  </Stack>
                )
              }
              )}
          </Stack>
        </Stack>
      </Box>



      <Box sx={{ width: "100%", position: "relative" }}>
        <textarea
          ref={textareaRef}
          rows="1"
          onKeyDown={(e) => { if (e.key === 'Enter') { sendTextMessage(textMessage, user, currentChat._id, setTextMessage,); textareaRef.current.style.height = 'auto'; e.preventDefault(); } }}
          value={textMessage}
          onChange={(e) => {
            setTextMessage(e.target.value);
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }}
          placeholder="Write a message..."
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            height: "auto",
            outline: "none",
            padding: "10px 50px",
            border: "none",
            borderWidth: "1px 0 0  0",
            backgroundColor: theme.palette.primary.background2,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.border,
            borderStyle: "solid",
            resize: "none",
            overflow: "hidden",
          }} />
        <style>
          {`
          textarea::placeholder {
            padding:0 0 0 4px ;
            line-height: 120% ;
            opacity: 0.8;
            color:${theme.palette.primary.text}
          }
        `}
        </style>
        <IconButton
          onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}
          sx={{ position: "absolute", top: "50%", right: "10px", transform: 'translateY(-50%)', color: theme.palette.primary.sendIcon }} >
          <SendRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => setShowPicker(!showPicker)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: 'translateY(-50%)',
            color: theme.palette.primary.text,
            '&:hover': { color: theme.palette.secondary.textHover }
          }} >
          <SentimentSatisfiedAltRoundedIcon />
        </IconButton>
        {showPicker && <Box sx={{ position: 'absolute', bottom: "50px", left: "0" }}>
          <EmojiPicker
            searchDisabled
            lazyLoadEmojis={false}
            emojiStyle="twitter"
            onEmojiClick={(e) => { setEmoji(e.emoji) }} />
        </Box>}
      </Box>
    </Stack>
  );
};

export default ChatBox;
