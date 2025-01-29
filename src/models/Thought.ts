import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: string[];
    formattedCreatedAt: string;
}

const ThoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    });
ThoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

ThoughtSchema.virtual('formattedCreatedAt').get(function (this: IThought) {
    const date = this.createdAt;
    
    const day = date.getDate(); 
    const month = date.toLocaleString('default', { month: 'long' }); 
    const year = date.getFullYear(); 

    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 

    return `${month} ${day}, ${year} ${hours}:${minutes}`; 
});

const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;