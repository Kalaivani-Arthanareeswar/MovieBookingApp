const express = require("express");
const router = express.Router();
const bookingModel = require("../model/Booking");

// Book a ticket
router.post("/", async (req, res) => {
  try {
    const { booking_id,name,contact,tickets_count,seat_number } = req.body;
// Create a new ticket
    const ticket = new bookingModel({
      booking_id,
      name,
      contact,
      tickets_count,
      seat_number
    });
    await ticket.save();
    res.status(201).json({ message: "Ticket booked successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Error booking ticket", error });
  }
});

router.get("/ticketview", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Edit Booking
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contact, tickets_count, seat_number } = req.body;

  try {
    const updatedBooking = await bookingModel.findByIdAndUpdate(
      id,
      { name, contact, tickets_count, seat_number },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking", error: err.message });
  }
});

// Delete Booking
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await bookingModel.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
});

router.post("/cancel-booking", async (req, res) => {
  const { booking_id } = req.body;

  try {
    const booking = await bookingModel.findOneAndUpdate(
      { booking_id },
      { status: "Cancelled" },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking ID not found" });
    }
    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
