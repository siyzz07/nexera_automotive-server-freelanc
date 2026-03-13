
import app from "./app.js";
import { dbConfig } from "./config/dbConfig.js";
import { envConfig } from "./config/envConfig.js";

dbConfig()



const PORT = envConfig.server.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});