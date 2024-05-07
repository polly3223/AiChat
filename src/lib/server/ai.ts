import { type Message, type Chat } from '../client/types';
import { aiClient, type Tool } from './aiAdapter';

const tools: Tool[] = [
	{
		type: 'function',
		function: {
			name: 'get_game_score',
			description: 'Get the score for a given NBA game',
			parameters: {
				type: 'object',
				properties: {
					team_name: {
						type: 'string',
						description: "The name of the NBA team (e.g. 'Golden State Warriors')"
					}
				},
				required: ['team_name']
			}
		}
	}
];

const chatSystemMsg = `You are an helpful assistant.
IMPORTANT: When you place code in the message, use the code block syntax specifing the language like this:

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

so that the code is syntax highlighted.`;

export async function aiChatMsg(chat: Chat): Promise<Message | null> {
	const msgList: Message[] = [{ role: 'system', content: chatSystemMsg }, ...chat.messages];
	const content = await aiClient.advancedCompletion('ChatMsg', msgList, tools);
	if (!content) return null;
	return { role: 'assistant', content };
}

const chatTitleSystemMsg = `Write the title of this chat, no more than 100 characters.
IMPORTANT: Only the title of the chat should be in the message, nothing else, do not put the title inside \"\" or ''.
`;

export async function aiChatTitle(chat: Chat): Promise<string> {
	const msgList: Message[] = [...chat.messages, { role: 'user', content: chatTitleSystemMsg }];
	const content = await aiClient.simpleCompletion('ChatTitle', msgList);
	if (!content) return 'CANNOT GENERATE TITLE';
	return content;
}
