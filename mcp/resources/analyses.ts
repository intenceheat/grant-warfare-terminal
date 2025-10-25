import { z } from 'zod';

// MCP Resource for cached analyses
export const analysesResource = {
  uri: 'analysis://cache',
  name: 'Cached Analyses',
  description: 'Previously analyzed proposals with psychology and edge results',
  mimeType: 'application/json',
  
  async read() {
    // This would connect to Supabase cache
    // For now, returning structure to show MCP compliance
    return {
      contents: [
        {
          uri: 'analysis://cache',
          mimeType: 'application/json',
          text: JSON.stringify({
            analyses: [],
            count: 0,
            lastUpdated: new Date().toISOString()
          })
        }
      ]
    };
  }
};

export const analysisResourceSchema = z.object({
  analyses: z.array(z.object({
    proposalId: z.string(),
    opportunityScore: z.number(),
    psychology: z.object({
      urgency: z.string(),
      desperation: z.string(),
      flexibility: z.string(),
      triggers: z.array(z.string())
    }),
    edge: z.object({
      skillMatch: z.number(),
      winProbability: z.number(),
      advantages: z.array(z.string()),
      gaps: z.array(z.string())
    }),
    createdAt: z.string()
  })),
  count: z.number(),
  lastUpdated: z.string()
});
