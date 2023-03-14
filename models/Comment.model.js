const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {

        text: {
            type: String,
            required: [true, 'Text is required.'],
            minlength: [2, 'Text must have min 2 characters.']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", commentSchema)

module.exports = Comment