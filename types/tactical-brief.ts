export interface TacticalBrief {
  proposal: {
    id: string;
    title: string;
    dao: string;
    deadline: string;
  };
  opportunityScore: number;
  psychology: {
    urgency: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    urgencyReason: string;
    desperation: 'LOW' | 'MODERATE' | 'HIGH';
    desperationReason: string;
    flexibility: 'LOW' | 'MODERATE' | 'HIGH';
    flexibilityReason: string;
    triggers: string[];
    fullAnalysis: string;
  };
  edge: {
    skillMatch: number;
    winProbability: number;
    advantages: string[];
    gaps: string[];
  };
  recommendation: {
    mainStrategy: string;
    emphasize: string[];
    avoid: string[];
    openingLine: string;
  };
}

export type PanelState = 'closed' | 'loading' | 'content';
