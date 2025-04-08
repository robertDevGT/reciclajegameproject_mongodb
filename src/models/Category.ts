import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ItemType } from "./Item";

export type CategoryType = Document & {
  categoryName: string;
  items: PopulatedDoc<ItemType & Document>[];
};

const CategorySchema : Schema = new Schema({
    categoryName: {
        type: String,
        required: true,
        trim:true
    },
    items: [
        {
            type: Types.ObjectId,
            ref: 'Item',
        }
    ]
}, {timestamps: true});

const Category = mongoose.model<CategoryType>("Cateogory",CategorySchema);
export default Category;