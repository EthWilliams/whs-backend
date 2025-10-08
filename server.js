import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// Allow requests from your Chrome extension
app.use(cors({
  origin: ["chrome-extension://fmdjimaoafbfmijhhenedhnmgendpeff"]
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/check-safety", async (req, res) => {
  const { scenario } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert in Australian WHS and S
