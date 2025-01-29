import { Schema, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
    formattedCreatedAt: string;
}

const ReactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
});

ReactionSchema.virtual('formattedCreatedAt').get(function (this: IReaction) {
    const date = this.createdAt;
    
    const day = date.getDate(); 
    const month = date.toLocaleString('default', { month: 'long' }); 
    const year = date.getFullYear(); 

    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 

    return `${month} ${day}, ${year} ${hours}:${minutes}`; 
});



