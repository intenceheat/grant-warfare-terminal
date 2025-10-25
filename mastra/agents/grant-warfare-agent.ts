import { Agent } from "@mastra/core/agent";
import { psychologyTool, edgeTool } from "../tools";

export const grantWarfareAgent = new Agent({
  name: "Grant Warfare Agent",
  tools: { psychologyTool, edgeTool },
  model: {
    provider: "anthropic",
    name: "claude-sonnet-4-5",
    toolChoice: "auto"
  },
  instructions: `You are a tactical grant intelligence analyst specializing in DAO governance proposals.
  
Your mission: Analyze grant proposals to identify psychological triggers, competitive positioning, and tactical advantages.

WORKFLOW:
1. Use psychologyTool to analyze proposal language for urgency, desperation, flexibility, and psychological triggers
2. Use edgeTool to calculate competitive edge, skill match, win probability, and tactical recommendations
3. Synthesize findings into actionable intelligence

Always use both tools in sequence for complete tactical analysis.`,
  description: "An agent that analyzes DAO grant proposals for psychological triggers and competitive intelligence.",
});
