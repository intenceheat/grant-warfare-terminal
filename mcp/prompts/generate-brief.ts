// MCP Prompt template for generating tactical brief
export const generateBriefPrompt = {
  name: 'generate-brief',
  description: 'Template for generating a tactical brief from analysis results',
  
  arguments: [
    {
      name: 'proposalTitle',
      description: 'Proposal title',
      required: true
    },
    {
      name: 'psychology',
      description: 'Psychology analysis JSON',
      required: true
    },
    {
      name: 'edge',
      description: 'Edge analysis JSON',
      required: true
    },
    {
      name: 'opportunityScore',
      description: 'Calculated opportunity score (0-10)',
      required: true
    }
  ],
  
  async get(args: Record<string, string>) {
    const { proposalTitle, psychology, edge, opportunityScore } = args;
    
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Generate a tactical brief for this proposal analysis:

PROPOSAL: ${proposalTitle}
OPPORTUNITY SCORE: ${opportunityScore}/10

PSYCHOLOGY ANALYSIS:
${psychology}

COMPETITIVE EDGE:
${edge}

Format the brief as:
1. Executive Summary (2-3 sentences)
2. Psychology Assessment (urgency, desperation, flexibility with reasons)
3. Competitive Positioning (skill match %, win probability %, key advantages)
4. Critical Gaps to Address
5. Tactical Recommendations (main strategy, what to emphasize, what to avoid)
6. Opening Line (ready-to-use first sentence for proposal response)

Make it actionable and tactical - focus on what the grant hunter should DO, not just what the data shows.`
          }
        }
      ]
    };
  }
};
