import { Request, Response } from 'express';

import User from '../models/User';

export default {
  async store(req: Request, res: Response) {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    return res.json(user);
  },
};
