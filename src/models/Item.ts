import mongoose, { Schema, Document, Types} from "mongoose";

export type ItemType = Document & {
  itemName: string;
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
    }
}, {timestamps: true});

const Item = mongoose.model<ItemType>("Item",ItemSchema);
export default Item;