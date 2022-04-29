var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const booked = new Schema({
    customerName:String,
    phone:String,
    email:String,
    note:String,
    table:[String],
    bookedFood:{
        id_food:[String],
        count:[String]
    },
    bookedAt:String,
    timeEat:String,
    state:Number,
    hour:Number, //hour eat
    date:String, // date eat
    slug:{type:String, slug:'customerName',unique:true}
});

module.exports = mongoose.model('booked',booked);

// state:
// value == 0 => table free
// value == 1 => table booked