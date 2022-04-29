var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const category = new Schema({
    name:String,
    productquantity:Number,
    time:String,
    slug:{type:String, slug:'name',unique:true}
});

module.exports = mongoose.model('categorys',category);