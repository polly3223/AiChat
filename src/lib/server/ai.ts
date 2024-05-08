import { type Message, type Chat } from '../client/types';
import { z } from 'zod';
import { aiClient } from './aiAdapter';
import { insertInfolist } from './mongo';

const infoSchema = z
	.object({
		type: z.enum(['person', 'place', 'event', 'link']),
		tag: z.string(),
		description: z.string()
	})
	.and(
		z.record(
			z
				.union([z.string(), z.number(), z.boolean()])
				.describe('Any other field you think is relevant.')
		)
	);
const saveSchema = z.object({
	operation: z.literal('SAVE'),
	infolist: z.array(infoSchema)
});
const readSchema = z.object({
	operation: z.literal('READ'),
	tag: z.string()
});
const noOpSchema = z.object({ operation: z.literal('NOOP') });
const operationSchema = z.union([saveSchema, readSchema, noOpSchema]);

export type Info = z.infer<typeof infoSchema>;

const chatSystemMsg = `You are an helpful assistant and you try to provide the best answers to the user.
When you place code in the message, use the code block syntax specifing the language like this:

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

so that the code is syntax highlighted.



You have the ability to SAVE and READ information.

When during the conversation with the user you get to know some information that you think is important about:
- people
- places
- events
- link web
etc
You should SAVE this information, but only save important information that you think will be useful in the future, do not save everything the user says.
If you or the user need informations with type that may saved in the DB like events you should READ and inform the user that you will inform the user about the information jsut after reading the DB.

const infoSchema = z
	.object({
		type: z.enum(['person', 'place', 'event', 'link']),
		tag: z.string(),
		description: z.string()
	})
	.and(
		z.record(
			z
				.union([z.string(), z.number(), z.boolean()])
				.describe('Any other field you think is relevant.')
		)
	);
const saveSchema = z.object({
	operation: z.literal('SAVE'),
	infolist: z.array(infoSchema)
});
const readSchema = z.object({
	operation: z.literal('READ'),
	tag: z.string()
});
const noOpSchema = z.object({ operation: z.literal('NOOP') });
const operationSchema = z.union([saveSchema, readSchema, noOpSchema]);


Answer with this format so that the automatic system can understand you correctly:

[ANSWER FOR THE USER]
----------DIV-----------
[JSON OBJECT PARSABLE WITH operationSchema]

Example:


I think this information is important.
----------DIV-----------
{
	"operation": "SAVE",
	"infolist": [
		{
			"type": "person",
			"tag": "Albert Einstein",
			"description": "A famous physicist."
		}
	]
}
`;

export async function aiChatMsg(chat: Chat): Promise<Message | null> {
	const msgList: Message[] = [{ role: 'system', content: chatSystemMsg }, ...chat.messages];
	const content = await aiClient.completion('ChatMsg', msgList);
	if (!content) return null;

	const [answer, json] = content.split('----------DIV-----------');

	const parsed = operationSchema.safeParse(JSON.parse(json));
	if (parsed.success) {
		if (parsed.data.operation === 'SAVE') {
			insertInfolist(parsed.data.infolist);
		}
	} else {
		console.log(parsed.error);
	}

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
