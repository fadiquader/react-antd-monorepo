import io from 'socket.io-client';
import axios from 'axios';
import { reportToSentry } from '../utils/sentry-util';
import { CUSTOM_SOCKET, CUSTOM_APP } from './../config';
import * as constants from '../utils/constants';

var socket = null;
export const socketStart = () => {
  if (socket) return Promise.resolve(socket);
  return new Promise((resolve, reject) => {
    try {
      const options = {
        transports: ['websocket'],
        path: '/realtime/realtime/',
        upgrade: false
      };

      socket = io.connect(CUSTOM_SOCKET, options);
      socket.on('connect', () => {
        console.log('Connection Established Established Established');
      });

      socket.on('reconnect_attempt', () => {
        socket.io.opts.transports = ['websocket'];
      });

      socket.once('connect', () => {
        resolve(socket);
      });
    } catch (err) {
      reject();
      reportToSentry(err, { extra: { socketStart: CUSTOM_SOCKET } });
    }
  });
};

//
export const subscribeToChangeSlide = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const emitToChannel = (channel, data) => {
  socket.emit(channel, data);
};

export const moveCursor = (data) => {
  socket.emit('Lesson:moveCursor', data);
};

export const subscribeToCursorMovement = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const changeSlide = (data) => {
  socket.emit('Lesson:changeSlide', data);
};

export const subscribeToChangeAudio = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const changeAudio = (data) => {
  socket.emit('Lesson:changeAudio', data);
};

export const changeTopic = (data) => {
  socket.emit('Lesson:changeLessonTopic', data);
};

export const endLesson = (data) => {
  socket.emit('Lesson:endLesson', data);
};

export const changeVideoSystem = (data) => {
  socket.emit('Lesson:changeVideoSystem', data);
};

export const subscribeToChangeTopic = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToEndLesson = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToToggleSlideVisibility = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const toggleSlideVisibility = (data) => {
  socket.emit('Lesson:toggleSlideVisibility', data);
};

//
export const handleWritingPad = (data) => {
  socket.emit('Lesson:writingPad', data);
};

export const subscribeToToggleWritingPadVisibility = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToToggleStopwatchVisibility = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToControlStopwatchActions = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToTogglePreviewHomeworkVisibility = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const subscribeToVideoSystem = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const toggleWritingPadVisibility = (data) => {
  socket.emit('Lesson:toggleWritingPadVisibility', data);
};

export const controlStopwatchActions = (data) => {
  socket.emit('Lesson:controlStopwatchActions', data);
};

export const toggleStopwatchVisibility = (data) => {
  socket.emit('Lesson:toggleStopwatchVisibility', data);
};

export const togglePreviewHomeworkVisibility = (data) => {
  socket.emit('Lesson:togglePreviewHomeworkVisibility', data);
};

export const webrtcReady = roomName => {
  socket.emit('ready', roomName);
};

export const webrtcSignal = payload => {
  socket.emit('signal', payload);
};

export const subscribeToWritingPad = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

export const emitUserLogin = data => {
  socket.emit('User:login', data);
};

export const subscribeToChannel = (channel, cb) => {
  socket.on(channel, cb);
  return () => socket && socket.off(channel);
};

//
export function subscribeToConnectionEvent(cb) {
  socket.on('connect', () => cb({ state: 'connected' }));
  socket.on('disconnect', () => cb({ state: 'disconnected' }));
  socket.on('connect_error', () => cb({ state: 'disconnected' }));
}

export const subscribeToSocketSignal = (cb) => {
  socket.on(constants.SOCKET_EVENT_SIGNAL, cb);
  return () => socket && socket.off(constants.SOCKET_EVENT_SIGNAL, cb);
};

export const subscribeToSocketEventUsers = (cb) => {
  socket.on(constants.SOCKET_EVENT_USERS, cb);
  return () => socket && socket.off(constants.SOCKET_EVENT_USERS, cb);
};

export const subscribeToPeerRemove = (cb) => {
  socket.on(constants.PEER_REMOVE, cb);
  return () => socket && socket.off(constants.PEER_REMOVE, cb);
};


export const socketClose = () => {
  if (socket) {
    socket.disconnect();
  }

  socket = null;
};

export function getSocket() {
  return socket;
}

export const getLessonState = (id) => {
  return axios.get(`${CUSTOM_APP}/lesson-state/${id}`);
};

export const getLessonSlide = (id) => {
  return axios.get(`${CUSTOM_APP}/lesson-slide/${id}`);
};

export const getServerTime = () => {
  return axios.get(`${CUSTOM_APP}/timestamp`);
};
