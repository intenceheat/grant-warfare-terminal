import { z } from 'zod';

// MCP-compliant edge analysis tool
export const edgeMCPTool = {
  name: 'analyze_edge',
  description: 'Calculates competitive edge, skill match, win probability, and tactical positioning recommendations based on psychology analysis',
  inputSchema: z.object({
    title: z.string().describe('Proposal title'),
    description: z.string().describe('Proposal description'),
    psychologyAnalysis: z.object({
      urgency: z.string(),
      urgencyReason: z.string(),
      desperation: z.string(),
      desperationReason: z.string(),
      flexibility: z.string(),
      flexibilityReason: z.string(),
      triggers: z.array(z.string()),
      fullAnalysis: z.string()
    }).describe('Psychology analysis results')
  }),
  execute: async (input: { title: string; description: string; psychologyAnalysis: any }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');

    const prompt = `You are a competitive strategy analyst. Based on this proposal and psychology assessment, calculate the competitive landscape and provide tactical positioning recommendations.

PROPOSAL: ${input.title}
DESCRIPTION: ${input.description}
PSYCHOLOGY ANALYSIS: ${JSON.stringify(input.psychologyAnalysis)}

Assess:

1. SKILL MATCH: How well does a capable builder match these requirements? (0-100%)
2. WIN PROBABILITY: What's the realistic chance of winning this grant? (0-100%)
3. COMPETITIVE ADVANTAGES: What strengths would give an edge here?
4. GAPS: What weaknesses or missing elements need to be addressed?
5. TACTICAL APPROACH: What's the winning strategy based on their psychology?

Return ONLY valid JSON (no markdown, no code blocks):

{
  "skillMatch": 75,
  "winProbability": 68,
  "advantages": ["specific advantage 1", "specific advantage 2", "specific advantage 3"],
  "gaps": ["specific gap 1", "specific gap 2"],
  "mainStrategy": "One clear sentence describing the winning tactical approach",
  "emphasize": ["key point to highlight 1", "key point to highlight 2", "key point to highlight 3"],
  "avoid": ["mistake to avoid 1", "mistake to avoid 2"],
  "openingLine": "A professional, compelling first sentence for the proposal response that matches their psychology"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) throw new Error(`Claude API error: ${response.status}`);
    const data = await response.json();
    let text = data.content[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(text);
  }
};
