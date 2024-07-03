const Slip = require('../models/slip-model'); // Assuming Slip model path

const saveSlip = async (req, res) => {
  try {
    const slipData = req.body; // Assuming req.body contains all slip data

    // Create a new instance of Slip model with data from req.body
    const newSlip = new Slip({
      slip_party_name : slipData.slip_party_name,
      slip_address: slipData.slip_address,
      slip_date: slipData.slip_date,
      slip_gstin: slipData.slip_gstin,
      slip_transport: slipData.slip_transport,
      slip_lrno: slipData.slip_lrno,
      slip_deliveryto: slipData.slip_deliveryto,
      slip_totalbale: slipData.slip_totalbale,
      slip_items: slipData.slip_items,
      slip_total_pieces: slipData.slip_total_pieces,
      remark: slipData.remark
    });

    // Save the new slip to the database
    await newSlip.save();

    // Respond with success message or any other response as needed
    res.status(201).json({ message: 'Slip saved successfully', slip: newSlip });
  } catch (error) {
    console.error('Error saving slip:', error);
    res.status(500).json({ error: 'Failed to save slip' });
  }
};

const ViewSlip = async (req, res) => {
  try {
    const slipNo = req.params.slip_no;
    const slip = await Slip.findOne({ slip_no: slipNo });

    if (!slip) {
      return res.status(404).json({ message: "Slip not found" });
    }

    res.status(200).json(slip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to count slips
const countSlip = async (req, res) => {
  try {
    const slipCount = await Slip.countDocuments();
    res.status(200).json({ count: slipCount });
  } catch (err) {
    res.status(500).json({ message: 'Error counting slips', error: err.message });
  }
};

const SlipData = async (req, res) => {
  try {
    const slips = await Slip.find();
    res.status(200).json(slips);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching slip data' });
  }
};

module.exports = {
  saveSlip,
  ViewSlip,
  countSlip,
  SlipData
};
