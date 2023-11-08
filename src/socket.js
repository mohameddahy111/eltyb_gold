import {io } from 'socket.io-client'

// const baseUrl = `https://eltaybbackend.onrender.com/`
const baseUrl = 'http://localhost:3001'
export const socket = io(baseUrl);