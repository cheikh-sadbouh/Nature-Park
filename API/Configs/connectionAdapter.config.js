const mongoose= require('mongoose');

const connectToMongoDB= function() {
    const mongodbUri= process.env.MONGODB_URI;
  mongoose.connect(mongodbUri);
  

  mongoose.connection.on('connected',  function() {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', function(error)  {
    console.error('Failed to connect to MongoDB', error);
  });
}

const disconnectFromMongoDB=  function() {
  mongoose.disconnect(function() {
    console.log('Disconnected from MongoDB');
  });
}

module.exports= {
  connect: connectToMongoDB,
  disconnect: disconnectFromMongoDB
}
