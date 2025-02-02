import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: string[];
    friends: IUser[];
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);
UserSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends.length;
}); 

export default mongoose.model<IUser>('User', UserSchema);;
