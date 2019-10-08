import { Response } from 'express';
import * as I from '../interfaces';
import Spot from '../models/Spot';
import User from '../models/User';

export default {
  async index(req: I.Request, res: I.Response) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  async store(req: I.Request, res: Response) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map((tech: string) => tech.trim()),
    });

    return res.json(spot);
  },
};
