import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  streetName: {
    type: String,
    enum: [
      'Vihara Road',
      'Waliwita Road',
      'E.A. Jayasinghe Road',
      'Gamunu Pura',
      'Samanala Pedesa'
    ],
    required: true
  },
  binCount: {
    type: Number,
    default: 1,
  },
  isCollected: {
    type: Boolean,
    default: false,
  },
  overflowReported: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);
