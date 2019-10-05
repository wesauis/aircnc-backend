import { Request, Response } from 'express';

import User from '../models/User';
import Spot from '../models/Spot';
import Booking from '../models/Booking';

export default {
  async store(req: Request, res: Response) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spot = await Spot.findById(spot_id);
    if (!spot) return res.status(400).json({ error: 'unknown spot' });

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('user')
      .populate('spot')
      .execPopulate();

    return res.json(booking);
  },
};
