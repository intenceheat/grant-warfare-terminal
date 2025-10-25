export { psychologyMCPTool } from './tools/psychology-mcp.js';
export { edgeMCPTool } from './tools/edge-mcp.js';
export { proposalsResource } from './resources/proposals.js';
export { analysesResource } from './resources/analyses.js';
export { analyzeProposalPrompt } from './prompts/analyze-proposal.js';
export { generateBriefPrompt } from './prompts/generate-brief.js';

// Export server initialization
export { default as startMCPServer } from './server/index.js';
