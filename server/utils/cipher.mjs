import bcrypt from "bcrypt"

const saltRounds = 10;

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds)
  return  bcrypt.hash(password, salt)

}

export const comparePassword = async (plain, hashed) => {
return   bcrypt.compare(plain, hashed);
}