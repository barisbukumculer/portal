import { UserModel } from "./models/UserModel"
import cryptoJS from "crypto-js"

export const firstUpper=(word:string)=>{
    const firstLetter = word.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = word.slice(1)
    var capitalizedWord = firstLetterCap + remainingLetters
    capitalizedWord=capitalizedWord.replaceAll("-"," ");
    return capitalizedWord
  }

export const getCustomer=()=>{
  const st=localStorage.getItem('customer')
  if(st===null){
    return null
  }else{
    //customer boş değil
    try {
      const plainText=decrypt(st)
      const user:UserModel=JSON.parse(plainText)
      return user
    } catch (error) {
      localStorage.removeItem('customer')
    }
  }
}

export const encrypt=(plainText:string)=>{
 const cipherText=cryptoJS.AES.encrypt(plainText,"key123").toString()
 return cipherText 
}
export const decrypt=(cipherText:string)=>{
  const bytes=cryptoJS.AES.decrypt(cipherText,"key123")
  const plainText=bytes.toString(cryptoJS.enc.Utf8)
  return plainText
}