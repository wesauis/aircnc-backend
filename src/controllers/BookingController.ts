import { Response } from 'express';

import User from '../models/User';
import Spot from '../models/Spot';
import Booking from '../models/Booking';

export default {
  async store(req: any, res: Response) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spot = await Spot.findById(spot_id);
    if (!spot) return res.status(400).json({ error: 'unknown spot' });

    const booking: any = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('user')
      .populate('spot')
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];
    if (ownerSocket) req.io.to(ownerSocket).emit('booking_request', booking);

    return res.json(booking);
  },
};
