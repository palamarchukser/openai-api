import { Configuration, OpenAIApi } from 'openai';
import readlineSync from 'readline-sync';
import {} from 'dotenv/config';

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const history = [];

  while (true) {
    const user_input = readlineSync.question('Enter your question: ');

    const messages = [];
    let errorMessage;
    for (const [input, completion] of history) {
      messages.push({ role: 'user', content: input });
      messages.push({ role: 'assistant', content: completion });
    }

    messages.push({ role: 'user', content: user_input });

    await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    })
    .then (({ data }) => {
      //console.log(data)
      const completion = data.choices[0].message.content;
      console.log(completion);

      history.push([user_input, completion]);
    })
    .catch(({ response, message }) => errorMessage = response.status ? `${response.status}: ${response.response}` : message);

    if (errorMessage) {
      console.log(errorMessage);
      return;
    }

    const isNextCompetition = readlineSync.question('\nWould you like to continue the conversation? (Y/N)');

    if (isNextCompetition.toUpperCase() !== 'Y') {
      return;
    }
  }
})();
