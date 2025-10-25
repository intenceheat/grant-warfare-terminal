export interface SnapshotSpace {
  id: string;
  name: string;
}

export interface SnapshotProposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  scores_total: number;
  space: SnapshotSpace;
}

export interface GraphQLResponse {
  data: {
    proposals: SnapshotProposal[];
  };
}

export interface Proposal {
  id: string;
  title: string;
  dao: string;
  budget: string;
  deadline: string;
  urgency: number;
  status: 'LIVE';
  proposalUrl: string;
  endTimestamp: number;
  body?: string;
}

export type DAOFilter = 'all' | 'defi' | 'gaming';
