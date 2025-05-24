import mongoose, { Schema, Document, Types} from "mongoose";

export interface IItem extends Document {
  itemName: string;
  imageUrl: string;
  category: Types.ObjectId
};

const ItemSchema : Schema = new Schema({
    itemName: {
        type: String,
        required: true,
        trim:true
    },
    category:{
        type: Types.ObjectId,
        ref: 'Category',
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Item = mongoose.model<IItem>("Item",ItemSchema);
export default Item;