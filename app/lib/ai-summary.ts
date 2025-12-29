import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({apiKey: process.env.CLAUDE_API_KEY,});

interface EmailMessage {
    from: string;
    subject: string;
    body: string;
    sentAt: string;
}

export async function summarizeThread(threadContent: EmailMessage[]): Promise<string> {
    // Format thread for prompt
    const formattedThread = threadContent.map((email, index) => `Email ${index +1}:\nFrom: ${email.from}\nSubject: ${email.subject}\nBody: ${email.body}\nSent At: ${email.sentAt}\n`).join('\n\n---\n\n');

    // Prompt
    const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: `Summarize this thread in one concise sentence no more than 10 words:\n\n${formattedThread}`
            }
        ]
    });

    // Extract and return summary
    return message.content[0].type ==='text' ? message.content[0].text : 'No summary available.';
}
