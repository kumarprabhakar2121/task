const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then((res) => {
      console.log(`>>> Database Connected Successfully`);
    })
    .catch((error) => {
      console.log(`> Error while connecting to mongoDB : ${error.message}`);
      process.exit(1);
    });
};
