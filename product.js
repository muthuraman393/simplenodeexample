var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductSchema   = new Schema({
    title: String,
    content: String
});
module.exports = mongoose.model('Note', ProductSchema);
// module.exports = mongoose.model('Product', ProductSchema,'optiponally pass schema name ');

