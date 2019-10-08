import express from 'express';
import socketio from 'socket.io';
import { Document } from 'mongoose';

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

export interface Booking {
  date?: string;
  approved?: boolean;
  user?: string | User;
  spot?: string | Spot;
}

export interface DocBooking extends Document, Booking {}

export interface Spot {
  thumbnail?: string;
  company?: string;
  price?: number;
  techs?: string[];
  user?: string | User;
}

export interface DocSpot extends Document, Spot {}

export interface User {
  email?: string;
}

export interface DocUser extends Document, User {}
