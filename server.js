import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
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
          { role: "system", content: "You are an expert in Australian WHS and Standards." },
          { role: "user", content: `Scenario: "${scenario}". List hazards, relevant Australian Standards, WHS regulations, and safety measures.` }
        ],
        temperature: 0
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No data returned from AI.";
    res.json({ content });

  } catch (err) {
    console.error(err);
    res.json({ content: "Error fetching data from OpenAI." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

