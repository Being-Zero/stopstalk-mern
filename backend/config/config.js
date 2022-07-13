module.exports = {
    "development": {
        'web_port': process.env.PORT || 4000,
        'db_connection_string': 'mongodb+srv://bz-kaushikk:bz-kaushikk@cluster0.r5pv7.mongodb.net/stopstalk?retryWrites=true&w=majority',
        'jwt_secret': 'BeingZeroStopstalk',
    },
    "production": {
        'web_port': process.env.PORT || 80,
        'db_connection_string': process.env.DB_CONNECTION_STRING || 'mongodb+srv://bz-kaushikk:bz-kaushikk@cluster0.r5pv7.mongodb.net/stopstalk?retryWrites=true&w=majority',
        'jwt_secret': process.env.JWT_SECRET || 'BeingZeroStopstalk',
    },
    get_active_config: function() {
        var config_profile = process.env.BZENV || 'development';
        console.log("CONFIG PROFILE SELECTED IS:  " + config_profile);
        return this[config_profile];
    }
}