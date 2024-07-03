const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema for slip item
const slipItemSchema = new Schema({
  slip_item_quality: { type: String, required: true },
  slip_item_size: { type: String, required: true },
  slip_item_total_piece: { type: Number, required: true }
});

// Define schema for slip
const slipSchema = new Schema({
  slip_code: { type: String, unique: true },
  slip_no: { type: String, unique: true },
  slip_party_name : {type : String, required : true},
  slip_address: { type: String, required: true },
  slip_date: { type: Date, required: true },
  slip_gstin: { type: String, required: true },
  slip_transport: { type: String, required: true },
  slip_lrno: { type: String, required: true },
  slip_deliveryto: { type: String, required: true },
  slip_totalbale: { type: Number, required: true },
  slip_items: [slipItemSchema],
  slip_total_pieces: { type: Number, required: false },
  remark: { type: String, required: false }
});

// Pre-save hook to generate slip_code and slip_no
slipSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Slip = mongoose.model('Slip', slipSchema);
    const count = await Slip.countDocuments({}); // Count existing documents

    // Generate slip_code starting from "S1"
    this.slip_code = `S${count + 1}`;

    // Generate slip_no starting from "1001"
    this.slip_no = `${1000 + count + 1}`;

    // Calculate slip_total_pieces
    this.slip_total_pieces = this.slip_items.reduce((total, item) => total + item.slip_item_total_piece, 0);
  }
  next();
});

// Create model
const Slip = mongoose.model('Slip', slipSchema);

module.exports = Slip;
