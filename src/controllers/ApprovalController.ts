import { Request, Response } from 'express';

import Booking from '../models/Booking';

// TODO: only the owner can approve

export default {
  async store(req: Request, res: Response) {
    const { booking_id } = req.params;

    const booking: any = await Booking.findById(booking_id).populate('spot');
    booking.approved = true;
    await booking.save();

    return res.json(booking);
  },
};
