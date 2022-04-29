const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/hotpot_restaurant');
        console.log("ket noi thanh cong");
    } catch (error) {
        console.log("ket noi khong thanh cong");
    }
}

module.exports = { connect };