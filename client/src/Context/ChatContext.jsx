import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../Utils/Services";
import { io } from "socket.io-client"; // socket.io-client import

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // ========================================================================Socket.io ==================================================================================
  useEffect(() => {
    // الاتصال بالسيرفر
    const Socket = io("http://localhost:3000"); // العنوان يجب أن يتطابق مع السيرفر
    setSocket(Socket)
    console.log("==============================================");
    console.log("Connecting to Socket.io ");
    console.log("==============================================");
    return () => {
      Socket.disconnect();
    };
  }, [user]);
  //تحديد المستخدمين الموجودين(online)
  //وتخزين المعرف الخاص بهم فى (state)
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (OnlineUsers) => {
      setOnlineUsers(OnlineUsers);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  // send messages 
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== user?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);
  // receive messages
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);
  
  // ========================================================================##Socket.io ==================================================================================
  // تحديد المستخدمين المحتمل انشاء محادثه معهم
  // ========================================================================get Potential Chats ==================================================================================
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users/find`);
      if (response.error) {
        return console.log("Error Fetching Users", response);
      }
      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    getUsers();
  }, [userChats]);
  // ========================================================================##get Potential Chats ==================================================================================
  // العثور على جميع المحادثات للمستخدم الحالى 
  // ========================================================================get User Chats==================================================================================
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);
  // ========================================================================##get User Chats==================================================================================
  // الحصول على رسائل المحادثه الحاليه
  // ========================================================================get the current Chat messages ==================================================================================
  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );
      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);
  // ========================================================================##get the current Chat messages ==================================================================================
  // انشاء رساله جديده واتخزينها فى قاعدة البيانات
  // ========================================================================Create New Message ==================================================================================
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("you must type some thing...");
      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );
  // ========================================================================##Create New Message ==================================================================================
  // تخزين المحادثه الحاليه 
  // ========================================================================index Current Chat ==================================================================================
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);
  // ========================================================================##index Current Chat ==================================================================================
  // انشاء محادثه جديده
  // ========================================================================create New Chat ==================================================================================
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secondId }));
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);
  // ========================================================================##create New Chat ==================================================================================

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers
      }}>
      {children}
    </ChatContext.Provider>
  );
};
