const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  tickets_count: {
    type: Number,
    required: true,
  },
  seat_number: [
    {
      type: String,
      required: true,
    },
  ],
  booking_date: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: "Booked" }, // Status of the booking
});

module.exports = mongoose.model("Booking", ticketSchema);
