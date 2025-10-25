import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { psychologyMCPTool } from '../tools/psychology-mcp.js';
import { edgeMCPTool } from '../tools/edge-mcp.js';
import { proposalsResource } from '../resources/proposals.js';
import { analysesResource } from '../resources/analyses.js';
import { analyzeProposalPrompt } from '../prompts/analyze-proposal.js';
import { generateBriefPrompt } from '../prompts/generate-brief.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'grant-warfare-terminal',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: psychologyMCPTool.name,
        description: psychologyMCPTool.description,
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Proposal title' },
            description: { type: 'string', description: 'Proposal description' },
            dao: { type: 'string', description: 'DAO name' },
          },
          required: ['title', 'description', 'dao'],
        },
      },
      {
        name: edgeMCPTool.name,
        description: edgeMCPTool.description,
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Proposal title' },
            description: { type: 'string', description: 'Proposal description' },
            psychologyAnalysis: {
              type: 'object',
              description: 'Psychology analysis results',
            },
          },
          required: ['title', 'description', 'psychologyAnalysis'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === psychologyMCPTool.name) {
      const result = await psychologyMCPTool.execute(args as any);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    if (name === edgeMCPTool.name) {
      const result = await edgeMCPTool.execute(args as any);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing tool: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Register resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: proposalsResource.uri,
        name: proposalsResource.name,
        description: proposalsResource.description,
        mimeType: proposalsResource.mimeType,
      },
      {
        uri: analysesResource.uri,
        name: analysesResource.name,
        description: analysesResource.description,
        mimeType: analysesResource.mimeType,
      },
    ],
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === proposalsResource.uri) {
    return await proposalsResource.read();
  }

  if (uri === analysesResource.uri) {
    return await analysesResource.read();
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Register prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: analyzeProposalPrompt.name,
        description: analyzeProposalPrompt.description,
        arguments: analyzeProposalPrompt.arguments,
      },
      {
        name: generateBriefPrompt.name,
        description: generateBriefPrompt.description,
        arguments: generateBriefPrompt.arguments,
      },
    ],
  };
});

// Handle prompt requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === analyzeProposalPrompt.name) {
    return await analyzeProposalPrompt.get(args || {});
  }

  if (name === generateBriefPrompt.name) {
    return await generateBriefPrompt.get(args || {});
  }

  throw new Error(`Unknown prompt: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Grant Warfare Terminal MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
