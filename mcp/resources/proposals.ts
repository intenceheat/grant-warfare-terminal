import { z } from 'zod';

// MCP Resource for DAO proposals
export const proposalsResource = {
  uri: 'dao://proposals',
  name: 'Active DAO Proposals',
  description: 'Live DAO governance proposals from multiple DAOs',
  mimeType: 'application/json',
  
  async read() {
    // This would connect to your proposal scanner data
    // For now, returning structure to show MCP compliance
    return {
      contents: [
        {
          uri: 'dao://proposals',
          mimeType: 'application/json',
          text: JSON.stringify({
            proposals: [],
            count: 0,
            lastUpdated: new Date().toISOString()
          })
        }
      ]
    };
  }
};

export const proposalResourceSchema = z.object({
  proposals: z.array(z.object({
    id: z.string(),
    title: z.string(),
    dao: z.string(),
    description: z.string().optional(),
    status: z.string(),
    budget: z.number().optional(),
    deadline: z.string().optional()
  })),
  count: z.number(),
  lastUpdated: z.string()
});
