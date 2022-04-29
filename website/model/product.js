var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const product = new Schema({
    name:String,
    idCategory:String,
    img:String,
    price:String,
    countBooked:Number,
    promo:String,
    ingredients:[String],
    moreInfoText:String,
    moreInfoImg:[String],

    slug:{type:String, slug:'name',unique:true},
    time:String
});

module.exports = mongoose.model('product',product);