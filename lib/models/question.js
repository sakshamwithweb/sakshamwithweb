import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    resolves: { type: Boolean, default: false }
}, { timestamps: true })

export const Question =
    mongoose.models.questions || mongoose.model("questions", questionSchema);