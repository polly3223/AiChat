export type Message = { user: 'user' | 'ai'; text: string };
export type RenderedMessage = Message & { renderedText: string };
