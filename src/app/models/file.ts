import { Schema, model, models } from "mongoose";

const fileSchema = new Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

export default models.File || model("File", fileSchema);
