import { User } from "../Schemas/userSchema.mjs"
import validator from "validator"
import jwt from "jsonwebtoken"
import { body, validationResult, matchedData } from "express-validator"
import { hashPassword, comparePassword } from "../utils/cipher.mjs"
import { createRequire } from 'module';

// استخدام مفتاح jwt 
// ======================================================================== jwt token ==================================================================================
const createToken = (_id) => {
  const jwtkey = "secrit"
  return jwt.sign({ _id }, jwtkey, { expiresIn: 60 * 60 })
}
// ========================================================================##jwt token ==================================================================================
// تسجيل الدخول لاول مره register
// ======================================================================== register ==================================================================================
export const registerUser = async (request, response) => {
  try {
    const result = validationResult(request);
    const data = matchedData(request)
    let user = await User.findOne({ email: data.email })
    if (user) return response.status(400).json("User with the given email is alridy exist...");
    user = await User.findOne({ name: data.name })
    if (user) return response.status(400).json("User with the given name is alridy exist...");
    if (!result.isEmpty()) return response.status(400).json(result.array()[0].msg)
    user = new User(data)
    user.password = await hashPassword(user.password)
    await user.save()
    const token = createToken(user._id)
    response.status(200).json({ _id: user._id, name: data.name, email: data.email, token });
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).send(`Error ${err}`)
  }
}
// ========================================================================##register ==================================================================================
// تسجيل الدخول المستمر login
// ======================================================================== Login ==================================================================================
export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    let user = await User.findOne({ email });
    if (!user) return response.status(400).json("Invalid email");
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) return response.status(400).json("Incorrect password");
    const token = createToken(user._id);
    response.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`);
  }
}
// ========================================================================##Login ==================================================================================
//  البحث عن مستخدم واحد او كل المستخدمين 
// ========================================================================ايجاد مستخدم ==================================================================================
export const findUser = async (request, response) => {
  try {
    const { params: { id } } = request;
    const user = await User.findById(id);
    response.status(200).json(user);
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`);
  }
}
export const getUsers = async (request, response) => {
  try {
    const users = await User.find()
    response.status(200).send(users)
  } catch (err) {
    console.log(`Error ${err}`);
    response.status(500).json(`Error ${err}`);
  }
}
// ========================================================================##ايجاد مستخدم ==================================================================================
// التحقق من بيانات تسجيل الدخول 
// ======================================================================== التحقق ==================================================================================
export const bodyValidator = () => [body("name")
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ min: 3, max: 20 })
  .withMessage("name must be at least 3 characters at most 20 characters ")
  .isString()
  .withMessage("name must be characters "),
body("email")
  .isEmail()
  .withMessage('Invalid email format'),
body("password")
  .isLength({ min: 6, max: 20 })
  .withMessage('Password must be at least 6 characters at most 20 characters ')
]
// ========================================================================##التحقق ==================================================================================




