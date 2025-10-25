import { SnapshotProposal, GraphQLResponse, Proposal, DAOFilter } from '@/types/snapshot';

const SNAPSHOT_HUB_URL = 'https://hub.snapshot.org/graphql';

function categorizeDAO(spaceName: string, spaceId: string): 'defi' | 'gaming' | 'other' {
  const name = spaceName.toLowerCase();
  const id = spaceId.toLowerCase();

  const defiKeywords = ['defi', 'swap', 'finance', 'lending', 'liquidity', 'yield', 'protocol', 'dex', 'aave', 'uniswap', 'compound', 'curve', 'sushi', 'balancer', 'maker', 'synthetix', 'yearn'];
  const gamingKeywords = ['game', 'gaming', 'play', 'metaverse', 'nft', 'sandbox', 'decentraland', 'axie', 'gala', 'illuvium', 'gods', 'unchained'];

  for (const keyword of defiKeywords) {
    if (name.includes(keyword) || id.includes(keyword)) {
      return 'defi';
    }
  }

  for (const keyword of gamingKeywords) {
    if (name.includes(keyword) || id.includes(keyword)) {
      return 'gaming';
    }
  }

  return 'other';
}

export function formatTimeRemaining(endTimestamp: number): string {
  const now = Date.now();
  const diff = endTimestamp * 1000 - now;

  if (diff <= 0) return 'EXPIRED';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

export function calculateUrgency(endTimestamp: number): number {
  const now = Date.now();
  const diff = endTimestamp * 1000 - now;
  const hoursLeft = diff / (1000 * 60 * 60);

  if (hoursLeft <= 0) return 100;
  if (hoursLeft >= 168) return 0;

  const urgency = 100 - (hoursLeft / 168) * 100;
  return Math.min(100, Math.max(0, urgency));
}

export function extractBudget(body: string): string {
  const dollarPattern = /\$\s*[\d,]+(?:\.\d{2})?(?:\s*(?:USD|usd))?/;
  const usdcPattern = /[\d,]+\s*(?:USDC|usdc|USD|usd)/;
  const solPattern = /[\d,]+\s*(?:SOL|sol)/;

  const dollarMatch = body.match(dollarPattern);
  if (dollarMatch) {
    return dollarMatch[0].replace(/\s+/g, ' ').trim();
  }

  const usdcMatch = body.match(usdcPattern);
  if (usdcMatch) {
    return usdcMatch[0].replace(/\s+/g, ' ').trim();
  }

  const solMatch = body.match(solPattern);
  if (solMatch) {
    return solMatch[0].replace(/\s+/g, ' ').trim();
  }

  return 'N/A';
}

export function transformProposal(proposal: SnapshotProposal): Proposal {
  return {
    id: proposal.id,
    title: proposal.title,
    dao: proposal.space.name,
    budget: extractBudget(proposal.body),
    deadline: formatTimeRemaining(proposal.end),
    urgency: calculateUrgency(proposal.end),
    status: 'LIVE',
    proposalUrl: `https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`,
    endTimestamp: proposal.end,
    body: proposal.body,
  };
}

export async function fetchActiveProposals(filter: DAOFilter = 'all'): Promise<Proposal[]> {
  const query = `
    query Proposals {
      proposals(
        first: 20,
        where: {
          state: "active"
        },
        orderBy: "created",
        orderDirection: desc
      ) {
        id
        title
        body
        choices
        start
        end
        scores_total
        space {
          id
          name
        }
      }
    }
  `;

  try {
    const response = await fetch(SNAPSHOT_HUB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();

    if (!result.data || !result.data.proposals) {
      throw new Error('Invalid response structure from Snapshot API');
    }

    const allProposals = result.data.proposals.map(transformProposal);

    if (filter === 'all') {
      return allProposals;
    }

    return allProposals.filter(proposal => {
      const originalProposal = result.data.proposals.find(p => p.id === proposal.id);
      if (!originalProposal) return false;

      const category = categorizeDAO(originalProposal.space.name, originalProposal.space.id);
      return category === filter;
    });
  } catch (error) {
    console.error('Error fetching proposals from Snapshot:', error);
    throw error;
  }
}
