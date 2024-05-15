# Ai Chat

Steps to run:

1) Create a ".env" file at the root of the project with this structure:

```
SECRET_MONGO_CONNECTION=mongodb+srvXXXXXXXXXXX
SECRET_PSW=XXXXXXXXXXX

SECRET_TOGHETERAI_API_KEY=XXXXXXXXXXX
SECRET_GROQ_API_KEY=XXXXXXXXXXX
SECRET_FIREWORKS_API_KEY=XXXXXXXXXXX
SECRET_OPENAI_API_KEY=XXXXXXXXXXX
```

The mongo connection string, a psw and at least one API token from one of the ai api vendors are required.
If you don't have a mongodb server working the fastest way to get it is by using mongo atlas https://www.mongodb.com/ , the free instance is more than enough.
The password is the one that will allow only you to access the service

2) Based on the api service you want to use go in the file aiAdapter.ts and uncomment it's relative line:
In this example you will be using OpenAI
```typescript
// export const aiClient: AiClient = new GroqClient();
// export const aiClient: AiClient = new ToghetherAiClient();
// export const aiClient: AiClient = new FireworksAiClient();
export const aiClient: AiClient = new OpenAiClient();
```

3) install the dependencies with:
```
pnpm install
```


4) run the project with:
```
pnpm dev
```


5) deploy the project online using a service like https://railway.app/ or on your own VPS