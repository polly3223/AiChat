import { type Message, type Chat } from '../client/types';
import { ai } from './aiAdapter';

const system = `You are an helpful assistant.
IMPORTANT: When you place code in the message, use the code block syntax specifing the language like this:

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

so that the code is syntax highlighted.`;

export async function aiChatMsg(chat: Chat): Promise<Message | null> {
	const msgList: Message[] = [{ role: 'system', content: system }, ...chat.messages];
	const completion = await ai('meta-llama/Llama-3-70b-chat-hf', msgList);
	if (typeof completion === 'string') return null;
	return completion;
}
