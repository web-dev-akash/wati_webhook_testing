const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = 8080;
const WATI_TOKEN = process.env.WATI_TOKEN;

const sendMessageToUser = async (text) => {
  try {
    const url = `https://live-server-105694.wati.io/api/v1/sendSessionMessage/917018178377?messageText=Hello%20%5Cn%20How%20are%20you`;
    const config = {
      headers: {
        Authorization: `Bearer ${WATI_TOKEN}`,
      },
    };
    console.log("first");
    const response = await axios.post(url, config);
    console.log("second");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

app.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    await sendMessageToUser(text);
    res.send({
      status: "success",
    });
  } catch (error) {
    res.send({
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:8080`);
});
