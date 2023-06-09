const fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `Human:${text}\nAI:`,
  temperature: 0.9,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0.0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI"],
});

let seend = `text: "```Question :\n```" + q + "\n\n" + "```Answers :\n```" + response.data.choices[0].text`     
.then((response) => response.json())
.then((responseJson) => {
    // response
    console.log(responseJson)
})