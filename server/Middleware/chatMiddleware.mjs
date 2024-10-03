import { Chat } from '../Schemas/chatSchema.mjs'
//Create Chat 
//get All Chats
//find Chat

// انشاء محادثه بين شخصين 
// ========================================================================new chat ==================================================================================
export const createChat = async (request, response) => {
  const { firstId, secondId } = request.body;
  try {
    let chat = await Chat.findOne({
      members: { $all: [firstId, secondId] }
    })
    if (chat) {
      return response.status(200).json(chat);
    }
    const newChat = new Chat({
      members: [firstId, secondId]
    })
    chat = await newChat.save()
    response.status(200).json(chat);
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`)
  }
};
// ========================================================================##new chat ==================================================================================
// الحصول على جميع المحادثات لمستخدم 
// ========================================================================get all chats for a user ==================================================================================
export const findUserChats = async (request, response) => {
  const userId = request.params.userId;
  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });
    response.status(200).json(chats);
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`)
  }
}
// ========================================================================##get all chats for a user ==================================================================================
// ايجاد محادثه معينه من خلال معرفات طرفى المحادثه
// ========================================================================get one chat  ==================================================================================
export const findChat = async (request, response) => {
  const { firstId, secondId } = request.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    response.status(200).json(chat);
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`)
  }
};
// ========================================================================##get one chat  ==================================================================================

