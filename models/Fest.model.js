const { Schema, model } = require("mongoose");

const festSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
            minlength: [2, 'Description must have min 2 characters.']
        },
        price: {
            type: Number,
            required: [true, 'Price is required.'],

        },
        genre: {
            type: String,
            required: [true, 'Genre is required.'],
            enum: ['Electro', 'Hip hop', 'Rock & Roll', 'Alternative', 'Reggae', 'Classic', 'Jazz', 'Mix', 'Other']
        },
        imageUrl: {
            type: String,
            default: 'https://festamajor.vilafranca.cat/sites/default/files/02000023000006900017.jpg',
            set: value => value === '' ? 'https://festamajor.vilafranca.cat/sites/default/files/02000023000006900017.jpg' : value
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required']
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Fest = model("Fest", festSchema)

module.exports = Fest