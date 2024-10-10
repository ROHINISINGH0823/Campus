const mongoose = require("mongoose");
const url =
  "mongodb+srv://krimusa7524:arohi0825@campuslien.0cifu.mongodb.net/?retryWrites=true&w=majority&appName=CampusLien";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("Error: ", error));
};
