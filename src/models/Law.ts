import mongoose from "mongoose";

const LawSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    details: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Law || mongoose.model("Law", LawSchema);
