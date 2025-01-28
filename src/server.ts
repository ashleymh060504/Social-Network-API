import express from "express";
import db from './config/connection.js';

await db();
const app = express();





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});