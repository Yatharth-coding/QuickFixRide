const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const { serviceType, pickupLocation, dropoffLocation, mechanicName, mechanicAddress, date, time, price } = req.body;

        const booking = await Booking.create({
            user: req.user.id,
            serviceType,
            pickupLocation,
            dropoffLocation,
            mechanicName,
            mechanicAddress,
            date,
            time,
            price
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
