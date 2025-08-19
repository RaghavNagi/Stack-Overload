const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
console.log("MONGO_URI is:", process.env.MONGO_URI);

const PORT = process.env.PORT || 4888;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
