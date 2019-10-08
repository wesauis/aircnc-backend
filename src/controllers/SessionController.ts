import * as I from '../interfaces';
import User from '../models/User';

export default {
  async store(req: I.Request, res: I.Response) {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    return res.json(user);
  },
};
