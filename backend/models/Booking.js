const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['ride', 'mechanic', 'car_wash']
    },
    // Ride Specific
    pickupLocation: {
        type: String,
        required: function() { return this.serviceType === 'ride'; }
    },
    dropoffLocation: {
        type: String,
        required: function() { return this.serviceType === 'ride'; }
    },
    // Mechanic Specific
    mechanicName: {
        type: String,
        required: function() { return this.serviceType === 'mechanic'; }
    },
    mechanicAddress: {
        type: String,
        required: function() { return this.serviceType === 'mechanic'; }
    },
    // Common Fields
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
