import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest, ProtectedGetRequest } from "../Utils/Services";
import { io } from "socket.io-client"; // socket.io-client import

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [searchedPotentialChats, setSearchedPotentialChats] = useState([])
  const [searchInputValue, setSearchInputValue] = useState("")
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [displayUserChats, setDisplayUserChats] = useState(true)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [chatPageLoading , setChatPageLoading]= useState(false)


  // ========================================================================Socket.io ==================================================================================
  useEffect(() => {
    // الاتصال بالسيرفر
    const Socket = io("http://localhost:3000"); // العنوان يجب أن يتطابق مع السيرفر
    setSocket(Socket)
    // console.log("==============================================");
    // console.log("Connecting to Socket.io ");
    // console.log("==============================================");
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
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId)
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev])
      }
      else { setNotifications((prev) => [res, ...prev]) }
    })
    return () => {
      socket.off("getMessage");
      socket.off("getNotification")
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
      setAllUsers(response)
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
  }, [user, notifications]);
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
  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
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
      return (setSendTextMessageError(response), console.log(sendTextMessageError))
    }
    setNewMessage(response);
    setMessages((prev) => [...prev, response]);
    setTimeout(() => {
      setTextMessage("");
    }, 0);
  }, []);
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
    setCurrentChat(response)
  }, []);
  // ========================================================================##create New Chat ==================================================================================
  // ========================================================================Notification session ==================================================================================
  const markAllNotificationsAsRead = useCallback((notifications) => {
    const mNotifications = notifications.map(n => { return { ...n, isRead: true } })
    setNotifications(mNotifications)
  }, [])
  const markNotificationAsRead = useCallback((n, userChats, user, notifications) => {
    const desiredChat = userChats.find(chat => {
      const ChatMembers = [user._id, n.senderId]
      const isDesiredChat = chat?.members.every((member) => {
        return ChatMembers.includes(member)
      })
      return isDesiredChat
    })
    const mNotifications = notifications.map(el => {
      if (n.senderId === el.senderId) {
        return { ...n, isRead: true }
      } else {
        return el
      }
    })
    updateCurrentChat(desiredChat)
    setNotifications(mNotifications)
  }, [])
  const markUserNotificationsAsRead = useCallback((thisUserNotifications, notifications) => {
    const mNotifications = notifications.map(el => {
      let notification;
      thisUserNotifications.forEach(n => {
        if (n.senderId === el.senderId) {
          notification = { ...n, isRead: true }
        } else {
          notification = el
        }
      })

      return notification
    })
    setNotifications(mNotifications)

  }, [])
  // ========================================================================##Notification session ==================================================================================
  // ========================================================================SearchBar functions==================================================================================
  const searchBarFocus = useCallback((setFocus) => {
    setFocus(true)
    setDisplayUserChats(false)
  }, [])
  const searchBarBlur = useCallback((setFocus, searchBar) => {
    setFocus(false)
    setTimeout(() => {
      setDisplayUserChats(true)
    }, 500);
    if (searchBar.value != '') {
      searchBar.focus()
    }
  }, [])
  useEffect(() => {
    setSearchedPotentialChats(potentialChats)
  }, [potentialChats])

  useEffect(() => {
    const filter = potentialChats.filter((chat) => chat.name.toLowerCase().includes(searchInputValue))
    setSearchedPotentialChats(filter)
  }, [searchInputValue])
  // ========================================================================##SearchBar functions==================================================================================
  // ========================================================================test ==================================================================================

  const testToken = useCallback(async () => {
    if (user?.token) {
      const response = await ProtectedGetRequest(`${baseUrl}/protected`, user?.token)
      if (response.error) {
        return console.log("token error", response);
      }
    }
  })
  useEffect(() => {
    testToken()
  }, [])
  // ========================================================================##test ==================================================================================

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
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markUserNotificationsAsRead,
        searchBarFocus,
        searchBarBlur,
        displayUserChats,
        setSearchInputValue,
        searchedPotentialChats,
        setOpenDrawer,
        openDrawer,
        setChatPageLoading,
        chatPageLoading
      }}>
      {children}
    </ChatContext.Provider>
  );
};

