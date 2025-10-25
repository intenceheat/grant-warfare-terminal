import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AnalysisRecord {
  id?: string;
  proposal_id: string;
  proposal_title: string;
  dao: string;
  opportunity_score: number;
  psychology: {
    urgency: string;
    urgencyReason: string;
    desperation: string;
    desperationReason: string;
    flexibility: string;
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
  created_at?: string;
}

export async function getCachedAnalysis(proposalId: string): Promise<AnalysisRecord | null> {
  try {
    const { data, error } = await supabase
      .from('proposal_analyses')
      .select('*')
      .eq('proposal_id', proposalId)
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error) {
      console.error('Error fetching cached analysis:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch cached analysis:', error);
    return null;
  }
}

export async function saveAnalysis(analysis: AnalysisRecord): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('proposal_analyses')
      .insert([analysis]);

    if (error) {
      console.error('Error saving analysis:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to save analysis:', error);
    return false;
  }
}
