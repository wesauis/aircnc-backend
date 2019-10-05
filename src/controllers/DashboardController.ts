import { Request, Response } from 'express';

import User from '../models/User';
import Spot from '../models/Spot';

export default {
  async show(req: Request, res: Response) {
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  },
};
