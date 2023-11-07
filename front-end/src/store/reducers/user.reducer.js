
import cookies from 'react-cookies';
import CryptoJS from 'crypto-js';
import { jwtDecode } from "jwt-decode";

const USER_STATE = {
  user: []
}


export default (state = USER_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SIGN_IN':
      cookies.save('user_session', payload.token)
      const dataToEncrypt = JSON.stringify(payload)
      cookies.save('id', payload.id)
      const secretKey = process.env.SECRETKEY || 'kafana'
      const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
      cookies.save('user', encryptedData)
      return { state, user: { ...payload, isLogged: true } }
    case 'USER_DATA':
      const decodedData = CryptoJS.AES.decrypt(payload, 'kafana').toString(CryptoJS.enc.Utf8)
      return { user: JSON.parse(decodedData) }
    case 'DECODE_TOKEN':
      const Detoken = cookies.load('user_session');
      const decoded = jwtDecode(Detoken);

      return { ...state, token: decoded };
    case 'LOG_OUT':
      cookies.remove('user_session')
      cookies.remove('user')
      return { ...state, user: { isLogged: false } }
    case 'id':
      return { ...state, user: payload }
    default:
      return state
  }
}

export const logOut = () => ({
  type: "LOG_OUT",
});

export const signin = (user) => ({
  type: "SIGN_IN",
  payload: user,
});

export const id = (id) => ({
  type: "id",
  payload: id,
});

export const uderData = (user) => ({
  type: "USER_DATA",
  payload: user,
});

export const DecodeToken = () => ({
  type: 'DECODE_TOKEN'
})


/* eslint-enable */
