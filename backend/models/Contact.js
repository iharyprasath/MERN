import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  company: String,
  status: {
    type: String,
    enum: ["interested", "follow-up", "closed"],
    default: "interested",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", contactSchema);
