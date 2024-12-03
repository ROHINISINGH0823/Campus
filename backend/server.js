const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routers");
const { PORT } = require("./config");
const db = require("./db");

// Import the Models
const Questions = require("./models/Questions");  // Ensure correct path
const Answers = require("./models/Answers");  // Ensure correct path

// Database connection
db.connect();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to CodeWithAkkyLabs");
  }
});

app.use(cors());

// Chat endpoint for chatbot logic
app.post("/chat", async (req, res) => {
  const { userInput } = req.body; // Get user input from the request body

  try {
    // Step 1: Search for the question in the database
    const question = await Questions.findOne({
      questionName: new RegExp(userInput, "i"), // Case-insensitive search
    });

    if (question) {
      // If question exists, find the associated answer
      const answer = await Answers.findOne({
        questionId: question._id,
      });

      if (answer) {
        // Return the stored answer if found
        return res.json({ botReply: answer.answer });
      } else {
        // If no answer found, return a default response
        return res.json({
          botReply: "Sorry, I don't have an answer for that yet. Let me find one for you.",
        });
      }
    } else {
      // Step 2: If no question found in the database, fallback to OpenAI
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,  // Use your OpenAI API Key here
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      return res.json({ botReply });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Oops! Something went wrong.");
  }
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
