import * as I from '../interfaces';
import Booking from '../models/Booking';
import Spot from '../models/Spot';
import User from '../models/User';

export default {
  async store(req: I.Request, res: I.Response) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: 'unknown user' });

    const spot = await Spot.findById(spot_id);
    if (!spot) return res.status(400).json({ error: 'unknown spot' });

    const booking: I.DocBooking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('user')
      .populate('spot')
      .execPopulate();

    const ownerSocketID =
      req.connectedUsers[String((booking.spot as I.Spot).user)];
    if (ownerSocketID)
      req.io.to(ownerSocketID).emit('booking_request', booking);

    return res.json(booking);
  },
};
