// MCP Prompt template for proposal analysis
export const analyzeProposalPrompt = {
  name: 'analyze-proposal',
  description: 'Template for analyzing a DAO proposal with psychology and edge tools',
  
  arguments: [
    {
      name: 'proposalId',
      description: 'Unique identifier for the proposal',
      required: true
    },
    {
      name: 'title',
      description: 'Proposal title',
      required: true
    },
    {
      name: 'description',
      description: 'Proposal description',
      required: false
    },
    {
      name: 'dao',
      description: 'DAO name',
      required: true
    }
  ],
  
  async get(args: Record<string, string>) {
    const { proposalId, title, description, dao } = args;
    
    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Analyze this DAO proposal:

PROPOSAL ID: ${proposalId}
TITLE: ${title}
DAO: ${dao}
DESCRIPTION: ${description || 'No description provided'}

Execute the following workflow:
1. Use analyze_psychology tool to extract behavioral signals
2. Use analyze_edge tool with psychology results to calculate competitive positioning
3. Generate tactical brief with opportunity score and recommendations

Return comprehensive analysis with:
- Opportunity Score (0-10)
- Psychology Assessment (urgency, desperation, flexibility, triggers)
- Competitive Edge (skill match, win probability, advantages, gaps)
- Tactical Recommendations (strategy, emphasize, avoid, opening line)`
          }
        }
      ]
    };
  }
};
