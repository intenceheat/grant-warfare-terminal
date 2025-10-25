// MCP-compliant API client
export async function analyzeThroughMCP(proposal: {
  proposalId: string;
  title: string;
  description?: string;
  dao: string;
}) {
  const response = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposal)
  });

  if (!response.ok) {
    throw new Error(`MCP Analysis failed: ${response.status}`);
  }

  return response.json();
}
