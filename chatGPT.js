const { OpenAIApi } = require('openai');

// 初始化 OpenAI API
const openai = new OpenAIApi('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');

// 定义生成对话文本的函数
async function generateResponse(prompt) {
  try {
    // 调用 OpenAI API 来生成对话文本
    const response = await openai.complete({
      engine: 'davinci-codex', // 选择模型，例如 davinci-codex
      prompt, // 提示文本
      max_tokens: 150, // 最大生成的 token 数量
    });

    // 返回生成的对话文本
    return response.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// 使用示例
generateResponse('How are you?').then(console.log);
