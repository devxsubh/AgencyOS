import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  bestFor: { type: String, required: true },
  serviceType: { type: String, required: true }, // 'webapp', 'automation', 'marketing'
}, { timestamps: true });

const Price = mongoose.models.Price || mongoose.model('Price', PriceSchema);
export default Price;