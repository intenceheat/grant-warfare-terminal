import { psychologyMCPTool } from '@/mcp/tools/psychology-mcp';
import { edgeMCPTool } from '@/mcp/tools/edge-mcp';
import { getCachedAnalysis, saveAnalysis, type AnalysisRecord } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Server-Sent Events for live streaming analysis
export async function POST(request: Request) {
  const body = await request.json();
  const { proposalId, title, description, dao } = body;

  // Check cache first
  const cachedAnalysis = await getCachedAnalysis(proposalId);
  if (cachedAnalysis) {
    return Response.json({
      success: true,
      cached: true,
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

  // Create streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send status update
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'status', 
            message: 'Starting psychology analysis...' 
          })}\n\n`)
        );

        // Execute psychology tool
        const psychology = await psychologyMCPTool.execute({
          title,
          description: description || 'No description provided',
          dao
        });

        // Stream psychology results
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'psychology', 
            data: psychology 
          })}\n\n`)
        );

        // Send status update
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'status', 
            message: 'Psychology complete. Starting edge analysis...' 
          })}\n\n`)
        );

        // Execute edge tool
        const edge = await edgeMCPTool.execute({
          title,
          description: description || 'No description provided',
          psychologyAnalysis: psychology
        });

        // Stream edge results
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'edge', 
            data: edge 
          })}\n\n`)
        );

        // Calculate opportunity score
        const opportunityScore = Math.round((edge.skillMatch * 0.4 + edge.winProbability * 0.6) / 10);

        const analysisData = {
          proposal: { id: proposalId, title, dao },
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

        await saveAnalysis(analysisRecord);

        // Send complete event
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'complete', 
            data: analysisData 
          })}\n\n`)
        );

        controller.close();
      } catch (error) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'error', 
            error: error instanceof Error ? error.message : 'Unknown error' 
          })}\n\n`)
        );
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
