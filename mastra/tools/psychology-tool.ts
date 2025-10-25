import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const psychologyTool = createTool({
  id: 'psychology-analysis',
  description: 'Analyzes DAO governance proposals for behavioral signals, urgency, desperation, flexibility, and psychological triggers',
  inputSchema: z.object({
    title: z.string(),
    description: z.string(),
    dao: z.string()
  }),
  outputSchema: z.object({
    urgency: z.enum(['CRITICAL', 'HIGH', 'MODERATE', 'LOW']),
    urgencyReason: z.string(),
    desperation: z.enum(['HIGH', 'MODERATE', 'LOW']),
    desperationReason: z.string(),
    flexibility: z.enum(['HIGH', 'MODERATE', 'LOW']),
    flexibilityReason: z.string(),
    triggers: z.array(z.string()),
    fullAnalysis: z.string()
  }),
  execute: async ({ context }) => {
    const { title, description, dao } = context;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

    const prompt = `You are a tactical intelligence analyst specializing in DAO governance and grant psychology. Analyze this proposal for behavioral signals that reveal the decision-makers' true motivations and urgency.

PROPOSAL TITLE: ${title}
DAO: ${dao}
DESCRIPTION: ${description || 'No description provided'}

Analyze the language, tone, structure, and content to extract:

1. URGENCY: How time-sensitive is this? Look for crisis language, deadline pressure, immediate need signals
2. DESPERATION: How badly do they need this? Detect emotional intensity, problem severity, pain point emphasis
3. FLEXIBILITY: How rigid are requirements? Identify negotiable vs non-negotiable elements, openness to alternatives
4. PSYCHOLOGICAL TRIGGERS: What keywords, themes, and concepts appear repeatedly? What motivates them?
5. DECISION-MAKER PROFILE: Technical language (engineers), business language (executives), or community language (DAO voters)?

Return ONLY valid JSON (no markdown, no code blocks):

{
  "urgency": "CRITICAL" | "HIGH" | "MODERATE" | "LOW",
  "urgencyReason": "One sentence explaining the urgency level based on specific language patterns",
  "desperation": "HIGH" | "MODERATE" | "LOW",
  "desperationReason": "One sentence explaining desperation signals detected",
  "flexibility": "HIGH" | "MODERATE" | "LOW",
  "flexibilityReason": "One sentence explaining how flexible they appear on requirements",
  "triggers": ["keyword1", "keyword2", "keyword3"],
  "fullAnalysis": "2-3 sentences providing tactical intelligence on how to position a winning response"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
    const data = await response.json();
    let text = data.content[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  }
});
