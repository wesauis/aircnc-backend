import { Response } from 'express';

import Booking from '../models/Booking';

// TODO: only the owner can approve

export default {
  async store(req: any, res: Response) {
    const { booking_id } = req.params;

    const booking: any = await Booking.findById(booking_id).populate('spot');
    booking.approved = true;
    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];
    if (bookingUserSocket)
      req.io.to(bookingUserSocket).emit('booking_response', booking);

    console.log(booking);

    return res.json(booking);
  },
};
