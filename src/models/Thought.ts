import { Schema, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: string[];
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
            default: Date.now,
            // get: (timestamp: Date) => dateFormat(timestamp)
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

const Thought = model<IThought>('Thought', ThoughtSchema);

export default Thought;