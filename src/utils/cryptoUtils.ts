import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'

dotenv.config()

const key = process.env.SECRET_KEY || ''

// Función para crear un hash 
export const createHash = (password: string): string => {
  return CryptoJS.AES.encrypt(password, key).toString()
}

// Función para verificar si la contraseña
export const isValidPassword = (encryptedPassword: string, password: string): boolean => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, key)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
    return originalPassword === password
  } catch (error) {
    return false
  }
}
