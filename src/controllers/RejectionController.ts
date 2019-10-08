import * as I from '../interfaces';
import Booking from '../models/Booking';

// @todo make only the owner of the spot evoke

export default {
  async store(req: I.Request, res: I.Response) {
    const { booking_id } = req.params;

    const booking: any = await Booking.findById(booking_id).populate('spot');
    booking.approved = false;
    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];
    if (bookingUserSocket)
      req.io.to(bookingUserSocket).emit('booking_response', booking);

    console.log(booking);

    return res.json(booking);
  },
};
