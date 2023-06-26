const express = require("express");
const axios = require("axios");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = 8080;
const WATI_TOKEN = process.env.WATI_TOKEN;

const sendMessageToUser = async (text, number) => {
  const messageText = `Hello, Thanks For Showing Interest in our Programme, This message is coming through WATI webhook`;
  if (text.toLowerCase() == "meinterestedwebhooktest") {
    const url = `https://live-server-105694.wati.io/api/v1/sendSessionMessage/${number}?messageText=${messageText}`;
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${WATI_TOKEN}` },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  }
};

app.post("/", async (req, res) => {
  try {
    const { text, waId } = req.body;
    console.log(req.body);
    const data = await sendMessageToUser(text, waId);
    res.send({
      data,
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
