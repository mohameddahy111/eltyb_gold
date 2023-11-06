import {io } from 'socket.io-client'

const baseUrl = `https://eltaybbackend.onrender.com/`
export const socket = io(baseUrl);