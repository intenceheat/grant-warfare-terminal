import { NextResponse } from 'next/server';
import { psychologyMCPTool } from '@/mcp/tools/psychology-mcp';
import { edgeMCPTool } from '@/mcp/tools/edge-mcp';
import { getCachedAnalysis, saveAnalysis, type AnalysisRecord } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// MCP-compliant analysis endpoint
export async function POST(request: Request) {
  console.log('=== MCP ANALYSIS API STARTED ===');

  try {
    const body = await request.json();
    const { proposalId, title, description, dao } = body;

    console.log('Received proposal:', { proposalId, title, dao });

    // Check Supabase cache first
    const cachedAnalysis = await getCachedAnalysis(proposalId);
    if (cachedAnalysis) {
      console.log('Returning cached analysis from Supabase');
      return NextResponse.json({
        success: true,
        cached: true,
        source: 'mcp',
        data: {
          proposal: {
            id: cachedAnalysis.proposal_id,
            title: cachedAnalysis.proposal_title,
            dao: cachedAnalysis.dao
          },
          opportunityScore: cachedAnalysis.opportunity_score,
          psychology: cachedAnalysis.psychology,
          edge: cachedAnalysis.edge,
          recommendation: cachedAnalysis.recommendation
        }
      });
    }

    console.log('No cache found, performing MCP tool analysis...');

    // Execute MCP psychology tool
    console.log('Calling MCP psychology tool...');
    const psychology = await psychologyMCPTool.execute({
      title,
      description: description || 'No description provided',
      dao
    });
    console.log('MCP Psychology analysis complete:', psychology);

    // Execute MCP edge tool
    console.log('Calling MCP edge tool...');
    const edge = await edgeMCPTool.execute({
      title,
      description: description || 'No description provided',
      psychologyAnalysis: psychology
    });
    console.log('MCP Edge analysis complete:', edge);

    // Calculate opportunity score
    const opportunityScore = Math.round((edge.skillMatch * 0.4 + edge.winProbability * 0.6) / 10);

    const analysisData = {
      proposal: {
        id: proposalId,
        title,
        dao
      },
      opportunityScore,
      psychology: {
        urgency: psychology.urgency,
        urgencyReason: psychology.urgencyReason,
        desperation: psychology.desperation,
        desperationReason: psychology.desperationReason,
        flexibility: psychology.flexibility,
        flexibilityReason: psychology.flexibilityReason,
        triggers: psychology.triggers,
        fullAnalysis: psychology.fullAnalysis
      },
      edge: {
        skillMatch: edge.skillMatch,
        winProbability: edge.winProbability,
        advantages: edge.advantages,
        gaps: edge.gaps
      },
      recommendation: {
        mainStrategy: edge.mainStrategy,
        emphasize: edge.emphasize,
        avoid: edge.avoid,
        openingLine: edge.openingLine
      }
    };

    // Save to Supabase
    const analysisRecord: AnalysisRecord = {
      proposal_id: proposalId,
      proposal_title: title,
      dao: dao,
      opportunity_score: opportunityScore,
      psychology: analysisData.psychology,
      edge: analysisData.edge,
      recommendation: analysisData.recommendation
    };

    const saved = await saveAnalysis(analysisRecord);
    if (saved) {
      console.log('Analysis saved to Supabase');
    }

    console.log('=== MCP ANALYSIS COMPLETE ===');
    return NextResponse.json({
      success: true,
      cached: false,
      source: 'mcp',
      data: analysisData
    });

  } catch (error) {
    console.error('=== MCP ANALYSIS FAILED ===');
    console.error('Error:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
