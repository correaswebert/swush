import mongoose, {Schema, Document} from "mongoose";

/* user interface */
export interface I_user extends Document{
    name: String;
    email: String;
    password: String;
}

/* user schema */
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

/* export the model and return I_user interface */
export default mongoose.model<I_user>('User', UserSchema);