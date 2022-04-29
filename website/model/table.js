var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const table = new Schema({
    name:String,
    state:Number, 
    slug:{type:String, slug:'name',unique:true},
    // time:{ type: Number, default: (new Date()).getTime() }
    time : String
});

module.exports = mongoose.model('tables',table);

// state:
// value == 0 => table free
// value == 1 => table booked