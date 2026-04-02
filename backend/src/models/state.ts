import mongoose, { Document, Schema } from "mongoose";

export interface IImageData {
  cardImage: string;
  bgImage: string;
  cardTitle: string;
}

export interface IDetailImage {
  detailImage: string;
  detailImageDescription: string;
}

export interface IDetail {
  detailTitle: string;
  detailDescription: string[];
  detailAdditionalInfo: string;
  detailImages: IDetailImage[];
}

export interface IState extends Document {
  stateID: string;
  stateName: string;
  stateDesc: string;
  ImagesData: IImageData[];
  detail: IDetail[];
  createdAt: Date;
  updatedAt: Date;
}

const imageDataSchema = new Schema<IImageData>({
  cardImage: { type: String, required: true },
  bgImage: { type: String, required: true },
  cardTitle: { type: String, required: true }
});

const detailImageSchema = new Schema<IDetailImage>({
  detailImage: { type: String, required: true },
  detailImageDescription: { type: String, required: true }
});

const detailSchema = new Schema<IDetail>({
  detailTitle: { type: String, required: true },
  detailDescription: [{ type: String }],
  detailAdditionalInfo: { type: String },
  detailImages: [detailImageSchema]
});

const stateSchema = new Schema<IState>({
  stateID: { type: String, required: true },
  stateName: { type: String, required: true },
  stateDesc: { type: String, required: true },
  ImagesData: [imageDataSchema],
  detail: [detailSchema]
}, {
  timestamps: true
});

// Database indexes for performance
stateSchema.index({ stateID: 1 }, { unique: true });

const State = mongoose.model<IState>("State", stateSchema);

export default State;
