import express from 'express';
import socketio from 'socket.io';

export interface Request extends express.Request {
  // socketio
  io: socketio.Server;
  // user_id:socket_id
  connectedUsers: ConnectedUsers;
}

export interface Response extends express.Response {}

export interface ConnectedUsers {
  [key: string]: string;
}
