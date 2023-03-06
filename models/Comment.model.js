const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {

        text: {
            type: String,
            required: [true, 'Text is required.'],
            minlength: [2, 'Text must have min 2 characters.']
        },
        fest: {
            type: String,
            required: [true, 'Fest is required.'],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Comment = model("Comment", commentSchema)

module.exports = Comment