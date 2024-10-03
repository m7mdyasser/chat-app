import { Message } from '../Schemas/messageSchema.mjs'
// انشاء رساله جديده
// ========================================================================create message ==================================================================================
export const createMessage = async (request, response) => {
  const { chatId, senderId, text } = request.body
  try {
    const message = new Message({
      chatId, senderId, text
    })
    const res = await message.save()
    response.status(200).json(res)
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`)
  }
};
// ========================================================================##create message ==================================================================================
// العثور على جميع الرسائل فى محادثه معينه
// ========================================================================get all messages in a chat ==================================================================================
export const getMessages = async (request, response) => {
  const { chatId } = request.params;
  try {
    const messages = await Message.find({ chatId })
    response.status(200).json(messages)
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`)
  }
};
// ========================================================================##get all messages in a chat ==================================================================================
