import mongoose from 'mongoose';

/*

_id: 67d96ae402448479109508f5
title: "The Pragmatic Programmer"
author: "Andrew Hunt, David Thomas"
publisher: "Addison-Wesley"
pages: 352
release_date: "1999-10-30"
ISBN: "978-0201616224"


*/
const catSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true
        },
        colour: {
            type: String,
            require: true
        },
        size: {
            type: String,
            require: true
        },
        categories: {
            type: Array
        },
        image: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        purchases: {
            type: Number,
            require: true
        },
        rating: {
            type: Number
        }
    }
)

const Cat = mongoose.model("cats", catSchema)
export default Cat;