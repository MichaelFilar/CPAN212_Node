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
const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true
        },
        difficulty: {
            type: String,
            require: true
        },
        ingredients: {
            type: Array,
            require: true
        },
        steps: {
            type: Array
        }
    }
)

const Recipe = mongoose.model("recipes", recipeSchema)
export default Recipe;