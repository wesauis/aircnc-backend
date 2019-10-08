import * as I from '../interfaces';
import Spot from '../models/Spot';
import User from '../models/User';

export default {
  async show(req: I.Request, res: I.Response) {
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  },
};
