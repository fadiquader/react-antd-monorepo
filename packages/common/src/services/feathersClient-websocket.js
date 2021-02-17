import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { SOCKET } from './../config';

const socket = io(SOCKET, {
  transports: ['websocket'],
  upgrade: false,
});

const feathersSocketClient = feathers();
feathersSocketClient.configure(socketio(socket));
//
// feathersSocketClient.configure(socketio.authentication({
//   // storage: cookies,
//   // cookie: 'MeeOppJWT',
//   storageKey: 'MeeOppJWT',
// }));

feathersSocketClient.configure(auth({
  // storage: cookies,
  // cookie: 'MeeOppJWT',
  storageKey: 'MeeOppJWT',
}));

export default feathersSocketClient;
