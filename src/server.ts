
import app from "./app.js";
import { dbConfig } from "./config/dbConfig.js";
import { envConfig } from "./config/envConfig.js";

dbConfig()



const PORT = Number(envConfig.server.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});