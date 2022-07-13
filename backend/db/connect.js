var mongoose = require('mongoose');
var config = require('../config/config')
var env_config = config.get_active_config();

const dbUrl = env_config.db_connection_string;


module.exports.connect = function () {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log(err));

    mongoose.Promise = global.Promise;
}

module.exports.disconnect = function () {
    mongoose.disconnect();
}