import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IItem } from "./Item";

export interface ICategory extends Document {
    categoryName: string;
    items: PopulatedDoc<IItem & Document>[];
};

const CategorySchema: Schema = new Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    items: [
        {
            type: Types.ObjectId,
            ref: 'Item',
        }
    ]
}, { timestamps: true });

const Category = mongoose.model<ICategory>("Cateogory", CategorySchema);
export default Category;