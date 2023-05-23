const { connect, connection } = require('mongoose');

const connectionString =
process.env.MONGODB_URI || 'mongodb://localhost/pizza-parlor';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;