import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // ✅ allows Chrome Extension to access it

const OPENAI_API_KEY = process.env.OPENAI_KEY; // set in Render Environment Variables

app.post("/check-safety", async (req, res) => {
  try {
    const { scenario } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert in Australian WHS and Safety Compliance. Provide a clear, structured hazard report for the given scenario."
          },
          { role: "user", content: scenario }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const content = data.choices[0].message.content;
    res.json({ content });
  } catch (error) {
    console.error("Error fetching data from OpenAI:", error);
    res.status(500).json({ error: "Error fetching data from OpenAI." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
