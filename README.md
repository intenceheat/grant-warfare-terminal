# GRANT WARFARE TERMINAL

**AI-Powered Tactical Intelligence for DAO Governance Proposals**

Built for the Nosana Agents 102 Challenge - A production-grade Mastra agent system with full MCP protocol implementation that transforms DAO grant proposals into actionable tactical intelligence.

---

## 🚀 LIVE DEPLOYMENT

- **Docker Hub**: `intenceheat/grant-warfare-terminal:final`
- **Nosana Network**: https://5jpz37pzjycm7xuqpfkpcksdkkmnlwspzz5htyqo4pqr.node.k8s.prd.nos.ci/
- **Demo Video**: https://www.youtube.com/watch?v=32zp-d3o_Jk
- **GitHub**: https://github.com/intenceheat/grant-warfare-terminal

---

## 📐 SYSTEM ARCHITECTURE

### High-Level Overview
```
┌─────────────────────────────────────────────────────────────────────┐
│                         GRANT WARFARE TERMINAL                       │
│                     Tactical Intelligence Platform                   │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
        ┌───────────────────────┐    ┌───────────────────────┐
        │   FRONTEND LAYER      │    │   MCP SERVER          │
        │   (Next.js 13.5)      │    │   (stdio transport)   │
        ├───────────────────────┤    ├───────────────────────┤
        │ • ProposalScanner     │    │ • Tool Discovery      │
        │ • TacticalBriefPanel  │    │ • Resource Management │
        │ • Glyph Navigation    │    │ • Prompt Templating   │
        │ • Filter System       │    │ • External Agent API  │
        └───────────┬───────────┘    └───────────────────────┘
                    │
                    ▼
        ┌───────────────────────────────────────────────────┐
        │           API LAYER (Next.js API Routes)          │
        ├───────────────────────────────────────────────────┤
        │  /api/analyze           │  /api/mcp               │
        │  (Mastra Direct)        │  (MCP Protocol)         │
        │  • Agent execution      │  • Tool discovery       │
        │  • Cached responses     │  • Resource access      │
        └───────────┬───────────────────────┬───────────────┘
                    │                       │
                    ▼                       ▼
        ┌───────────────────────┐  ┌──────────────────────┐
        │   MASTRA AGENT        │  │   MCP TOOLS          │
        │   grant-warfare-agent │  │   psychology-mcp     │
        ├───────────────────────┤  │   edge-mcp           │
        │ • Tool Orchestration  │  └──────────┬───────────┘
        │ • Sequential Pipeline │             │
        │ • Context Management  │             │
        └───────────┬───────────┘             │
                    │                         │
                    ▼                         ▼
        ┌────────────────────────────────────────────────────┐
        │         ANALYSIS TOOLS (Sequential Chain)          │
        ├────────────────────────────────────────────────────┤
        │                                                     │
        │  ┌──────────────────────┐  ┌────────────────────┐ │
        │  │  PSYCHOLOGY TOOL     │  │   EDGE TOOL        │ │
        │  ├──────────────────────┤  ├────────────────────┤ │
        │  │ Claude Sonnet 4.5    │→ │ Claude Sonnet 4.5  │ │
        │  │                      │  │                    │ │
        │  │ Extracts:            │  │ Calculates:        │ │
        │  │ • Urgency Level      │  │ • Skill Match %    │ │
        │  │ • Desperation        │  │ • Win Probability  │ │
        │  │ • Flexibility        │  │ • Advantages       │ │
        │  │ • Triggers           │  │ • Gaps             │ │
        │  │ • Profile            │  │ • Main Strategy    │ │
        │  └──────────┬───────────┘  └────────┬───────────┘ │
        │             │                       │             │
        │             └───────────┬───────────┘             │
        └─────────────────────────┼─────────────────────────┘
                                  │
                                  ▼
        ┌───────────────────────────────────────────────────┐
        │         DATA LAYER (Supabase PostgreSQL)          │
        ├───────────────────────────────────────────────────┤
        │  proposal_analyses        │  proposal_cache       │
        │  • Tactical brief storage │  • API response cache │
        │  • Analysis history       │  • Performance layer  │
        │  • Relational queries     │  • Instant retrieval  │
        └───────────────────────────────────────────────────┘
```

### Data Flow: Analysis Execution
```
USER ACTION: Click "ANALYZE TARGET"
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ 1. CHECK CACHE                                          │
│    Query: Supabase proposal_analyses table              │
│    • If found → Return instantly (cached=true)          │
│    • If not → Proceed to analysis                       │
└────────────┬────────────────────────────────────────────┘
             │ CACHE MISS
             ▼
┌─────────────────────────────────────────────────────────┐
│ 2. INITIATE ANALYSIS                                    │
│    Display: Loading modal with processing indicator     │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 3. PSYCHOLOGY TOOL EXECUTION (~10-12 seconds)          │
│    Input: { title, description, dao }                   │
│    LLM: Claude Sonnet 4.5                               │
│    Output: {                                            │
│      urgency: "CRITICAL" | "HIGH" | "MODERATE" | "LOW"  │
│      desperation: "HIGH" | "MODERATE" | "LOW"           │
│      flexibility: "HIGH" | "MODERATE" | "LOW"           │
│      triggers: ["keyword1", "keyword2", ...],           │
│      fullAnalysis: "..."                                │
│    }                                                    │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 4. EDGE TOOL EXECUTION (~10-12 seconds)                │
│    Input: { title, description, psychologyAnalysis }    │
│    LLM: Claude Sonnet 4.5                               │
│    Output: {                                            │
│      skillMatch: 85,                                    │
│      winProbability: 72,                                │
│      advantages: [...],                                 │
│      gaps: [...],                                       │
│      mainStrategy: "...",                               │
│      emphasize: [...],                                  │
│      avoid: [...],                                      │
│      openingLine: "..."                                 │
│    }                                                    │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 5. CALCULATE OPPORTUNITY SCORE                          │
│    Formula: (skillMatch × 0.4 + winProbability × 0.6)/10│
│    Example: (85 × 0.4 + 72 × 0.6) / 10 = 7.7           │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 6. SAVE TO SUPABASE                                     │
│    Table: proposal_analyses                             │
│    Data: Full tactical brief + timestamp                │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ 7. DISPLAY TACTICAL BRIEF                               │
│    Modal closes, brief panel slides in                  │
│    Complete analysis with all sections populated        │
│    Actions: "EXPORT BRIEF" | "ANALYZE ANOTHER"         │
└─────────────────────────────────────────────────────────┘

TOTAL TIME: 20-25 seconds
```

### MCP Protocol Integration
```
┌──────────────────────────────────────────────────────────┐
│           EXTERNAL MCP CLIENT (e.g. Claude Desktop)      │
│                    OR Custom MCP Consumer                 │
└────────────────────────┬─────────────────────────────────┘
                         │ stdio transport
                         ▼
┌──────────────────────────────────────────────────────────┐
│                MCP SERVER (Grant Warfare Terminal)        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  CAPABILITIES:                                           │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ TOOLS (ListToolsRequest)                        │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ • analyze_psychology                            │    │
│  │   Input: { title, description, dao }            │    │
│  │   Output: Psychology analysis JSON              │    │
│  │                                                  │    │
│  │ • analyze_edge                                   │    │
│  │   Input: { title, description, psychAnalysis }  │    │
│  │   Output: Competitive intelligence JSON         │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ RESOURCES (ListResourcesRequest)                │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ • dao://proposals                               │    │
│  │   Description: Active DAO grant proposals       │    │
│  │   MimeType: application/json                    │    │
│  │                                                  │    │
│  │ • analysis://cache                              │    │
│  │   Description: Cached tactical analyses         │    │
│  │   MimeType: application/json                    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │ PROMPTS (ListPromptsRequest)                    │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ • analyze-proposal                              │    │
│  │   Args: { proposalId, title, dao }              │    │
│  │   Returns: Complete analysis prompt             │    │
│  │                                                  │    │
│  │ • generate-brief                                │    │
│  │   Args: { analysis }                            │    │
│  │   Returns: Tactical brief generation prompt     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘

TRANSPORT: stdio (Standard Input/Output)
START COMMAND: pnpm run mcp
OUTPUT: "Grant Warfare Terminal MCP server running on stdio"
```

---

## 🧠 INTELLIGENCE ARCHITECTURE

Grant Warfare Terminal uses a **dual-tool Mastra pipeline** with MCP protocol implementation to transform raw grant proposals into actionable tactical intelligence:
```
DAO Proposal → MCP Psychology Tool → MCP Edge Tool → Tactical Brief
                    ↓                      ↓
              Urgency/Desperation    Skill Match/Strategy
                    ↓                      ↓
              Cached in Supabase    Cached in Supabase
```

### **Psychology Tool (MCP-Compliant)**
Analyzes proposal language to extract behavioral signals:
- **Urgency Level** (CRITICAL/HIGH/MODERATE/LOW)
- **Desperation Indicators** (HIGH/MODERATE/LOW)  
- **Flexibility Assessment** (HIGH/MODERATE/LOW)
- **Psychological Triggers** (keyword detection)
- **Decision-Maker Profile** (technical/business/community)

### **Edge Tool (MCP-Compliant)**
Calculates competitive positioning based on psychology analysis:
- **Skill Match** (0-100%): Alignment with builder capabilities
- **Win Probability** (0-100%): Realistic chance of success
- **Competitive Advantages**: What gives you an edge
- **Critical Gaps**: What needs to be addressed
- **Main Strategy**: Tactical approach recommendation
- **Emphasize/Avoid**: Key positioning guidance

### **Opportunity Score**
Weighted algorithm combining skill match and win probability:
```
Score = (skillMatch × 0.4 + winProbability × 0.6) / 10
```

---

## 🔌 MCP IMPLEMENTATION

### **Full Model Context Protocol Integration**

Grant Warfare Terminal implements the complete MCP specification for tool discovery, resource management, and prompt templating.

**Server Architecture:**
```
mcp/
├── server/index.ts          # MCP Server with stdio transport
├── tools/
│   ├── psychology-mcp.ts    # MCP-compliant psychology analysis
│   └── edge-mcp.ts          # MCP-compliant competitive intelligence
├── resources/
│   ├── proposals.ts         # MCP resource: dao://proposals
│   └── analyses.ts          # MCP resource: analysis://cache
├── prompts/
│   ├── analyze-proposal.ts  # MCP prompt template
│   └── generate-brief.ts    # MCP prompt template
└── index.ts                 # MCP exports
```

**MCP Capabilities:**
- ✅ **Tools**: 2 custom MCP tools (psychology + edge)
- ✅ **Resources**: 2 managed resources (proposals + cached analyses)
- ✅ **Prompts**: 2 templated prompts (analysis + brief generation)
- ✅ **Transport**: stdio server for agent communication

**Start MCP Server:**
```bash
pnpm run mcp
# Output: Grant Warfare Terminal MCP server running on stdio
```

**Why MCP:**
- Enables standardized tool/resource discovery
- Allows external agents to query our intelligence layer
- Provides prompt templates for consistent analysis
- Protocol-level interoperability with other MCP clients
- Future-proof agent ecosystem integration

---

## 🏗️ ARCHITECTURE DECISIONS

### **Why Dual-Tool Sequential Pipeline?**

**Decision:** Psychology analysis must complete before edge calculation.

**Rationale:**
- Psychology provides context required for edge tool
- Prevents hallucination (edge needs behavioral signals as input)
- Cacheable at individual tool level for performance
- Clear separation of concerns (analysis → strategy)
- Easier debugging and testing

**Alternative Considered:** Parallel execution rejected due to edge tool dependency on psychology output.

---

### **Why Supabase Over Redis?**

**Decision:** PostgreSQL via Supabase for caching layer.

**Rationale:**
- Persistent analysis history across sessions
- Relational queries for proposal filtering (by DAO, status, score)
- Row-level security ready for multi-user deployment
- Lower operational overhead vs Redis management
- Native JSON support for complex analysis objects

**Alternative Considered:** Redis rejected - ephemeral cache doesn't preserve intelligence history.

---

### **Why Claude Sonnet 4.5?**

**Decision:** Anthropic Claude Sonnet 4.5 for both tools.

**Rationale:**
- Superior behavioral language analysis (psychology tool)
- Better instruction following for structured JSON output
- Lower hallucination rate on competitive positioning
- Optimal cost/performance ratio ($3/$15 per MTok)
- Consistent output formatting

**Alternative Considered:** GPT-4o tested - worse at detecting psychological nuance in proposal language.

---

### **Why Docker Multi-Stage Build?**

**Decision:** Three-stage Dockerfile (deps → builder → runner).

**Rationale:**
- 229MB final image (production-optimized)
- Separate dependency/build/runtime stages
- Smaller attack surface (no build tools in production)
- Faster deployment on Nosana network
- Standard Next.js standalone output

**Alternative Considered:** Single-stage rejected - 800MB+ images too slow for decentralized compute.

---

## 🛠️ TECH STACK

### **Agent Framework**
- **Mastra**: TypeScript agent orchestration framework
- **MCP SDK**: Model Context Protocol implementation
- **Claude Sonnet 4.5**: LLM for behavioral + competitive analysis
- **Zod**: Schema validation for tool I/O

### **Backend**
- **Next.js 13.5**: App router + API routes
- **Supabase**: PostgreSQL caching + persistence
- **Node.js 20**: Runtime environment

### **Frontend**
- **React 18**: UI components
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **Lucide React**: Icon system

### **Infrastructure**
- **Docker**: Multi-stage containerization
- **Nosana**: Decentralized GPU compute
- **Docker Hub**: Image registry
- **Solana**: Blockchain for Nosana payments

---

## 📦 INSTALLATION & DEPLOYMENT

### **Local Development**
```bash
# Clone repository
git clone https://github.com/intenceheat/grant-warfare-terminal.git
cd grant-warfare-terminal

# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env
# Add your keys:
# - ANTHROPIC_API_KEY
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY

# Run development server
pnpm run dev

# Open http://localhost:3000
```

### **Start MCP Server**
```bash
# In separate terminal
pnpm run mcp

# Output: Grant Warfare Terminal MCP server running on stdio
```

### **Docker Build**
```bash
# Build image
docker build -t grant-warfare-terminal .

# Run locally
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=your-key \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  grant-warfare-terminal

# Push to Docker Hub
docker tag grant-warfare-terminal YOUR-USERNAME/grant-warfare-terminal:final
docker push YOUR-USERNAME/grant-warfare-terminal:final
```

### **Nosana Deployment**
```bash
# Install Nosana CLI
npm install -g @nosana/cli

# Check balance (need SOL + NOS)
nosana address --network mainnet

# Deploy to mainnet
nosana job post \
  --file nosana-job-env-fixed.json \
  --network mainnet \
  --market premium \
  --timeout 3600

# Get job URL from output
```

---

## 🎮 USAGE

### **1. Scan Active Proposals**
Terminal auto-loads 20 live DAO governance proposals from multiple DAOs.

### **2. Filter & Search**
Filter by DAO type (All, DeFi, Gaming), status, budget range, urgency level.

### **3. Analyze Target**
Click "ANALYZE TARGET" on any proposal to start MCP tool pipeline.

### **4. Analysis Execution**
Analysis runs for 20-25 seconds as both tools execute sequentially. Loading modal displays processing status.

### **5. Review Tactical Brief**
View comprehensive intelligence:
- **Opportunity Score** (0-10 rating with visual bar)
- **Psychology Assessment** (urgency, desperation, flexibility with detailed analysis)
- **Key Psychological Triggers** (keyword list)
- **Competitive Edge** (skill match %, win probability %)
- **Strategic Recommendations** (advantages, gaps, positioning strategy)
- **Tactical Guidance** (emphasize points, avoid mistakes, opening line)

### **6. Export Analysis**
Download tactical brief as formatted document for offline use.

---

## 🧪 MCP TOOLS

### **Psychology Tool**
```typescript
import { psychologyMCPTool } from '@/mcp/tools/psychology-mcp';

const result = await psychologyMCPTool.execute({
  title: "Proposal Title",
  description: "Proposal description...",
  dao: "DAOName"
});

// Returns:
// {
//   urgency: "HIGH",
//   urgencyReason: "...",
//   desperation: "MODERATE",
//   desperationReason: "...",
//   flexibility: "LOW",
//   flexibilityReason: "...",
//   triggers: ["keyword1", "keyword2"],
//   fullAnalysis: "..."
// }
```

### **Edge Tool**
```typescript
import { edgeMCPTool } from '@/mcp/tools/edge-mcp';

const result = await edgeMCPTool.execute({
  title: "Proposal Title",
  description: "Proposal description...",
  psychologyAnalysis: psychologyResult
});

// Returns:
// {
//   skillMatch: 75,
//   winProbability: 68,
//   advantages: ["advantage 1", "advantage 2"],
//   gaps: ["gap 1", "gap 2"],
//   mainStrategy: "...",
//   emphasize: ["point 1", "point 2"],
//   avoid: ["mistake 1", "mistake 2"],
//   openingLine: "..."
// }
```

---

## 🏗️ PROJECT STRUCTURE
```
grant-warfare-terminal/
├── mcp/                              # MCP Protocol Implementation
│   ├── server/
│   │   └── index.ts                  # MCP Server (stdio transport)
│   ├── tools/
│   │   ├── psychology-mcp.ts         # MCP psychology tool
│   │   └── edge-mcp.ts               # MCP edge tool
│   ├── resources/
│   │   ├── proposals.ts              # MCP resource: proposals
│   │   └── analyses.ts               # MCP resource: cached analyses
│   ├── prompts/
│   │   ├── analyze-proposal.ts       # MCP prompt template
│   │   └── generate-brief.ts         # MCP prompt template
│   └── index.ts                      # MCP exports
├── mastra/                           # Mastra Agent Layer
│   ├── tools/
│   │   ├── psychology-tool.ts        # Mastra psychology tool wrapper
│   │   ├── edge-tool.ts              # Mastra edge tool wrapper
│   │   └── index.ts
│   ├── agents/
│   │   ├── grant-warfare-agent.ts    # Main Mastra agent
│   │   └── index.ts
│   └── index.ts                      # Mastra configuration
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts              # Analysis endpoint
│   │   └── mcp/
│   │       └── route.ts              # MCP endpoint
│   ├── page.tsx                      # Main UI
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── scanner/
│   │   ├── ProposalScanner.tsx
│   │   ├── ProposalCard.tsx
│   │   └── FilterBar.tsx
│   ├── tactical-brief/
│   │   └── TacticalBriefPanel.tsx
│   ├── CommandHeader.tsx
│   ├── GlyphNavigation.tsx
│   └── ...
├── lib/
│   ├── supabase.ts                   # Supabase client + caching
│   ├── api-client.ts                 # API calls
│   ├── api-client-mcp.ts             # MCP API calls
│   └── snapshot.ts                   # Brief export
├── types/
│   ├── tactical-brief.ts
│   └── snapshot.ts
├── Dockerfile                         # Multi-stage production build
├── nosana-job-env-fixed.json          # Nosana deployment config
├── package.json
├── LICENSE                            # MIT License
└── README.md
```

---

## 🎯 KEY FEATURES

### **MCP Protocol Compliance**
- Full MCP server implementation with stdio transport
- 2 custom MCP tools (psychology + edge)
- 2 managed MCP resources (proposals + analyses)
- 2 templated MCP prompts (analysis + brief)
- Discoverable via standard MCP clients

### **Behavioral Psychology Analysis**
- Urgency detection via crisis language patterns
- Desperation signals from emotional intensity
- Flexibility assessment of requirements
- Psychological trigger extraction
- Decision-maker profiling

### **Competitive Intelligence**
- Skill match percentage calculation
- Win probability estimation
- Advantage/gap identification
- Strategic positioning recommendations
- Opening line generation

### **Supabase Caching**
- Instant retrieval for repeat analyses
- Persistent analysis history
- Multi-user support ready
- Relational query capability

### **Export Functionality**
- Download tactical briefs as documents
- Snapshot system for saving analyses
- Shareable intelligence reports

### **Military Terminal UI**
- Tactical command center aesthetic
- Glyph navigation system
- Loading state feedback
- Professional intelligence display

---

## 🔐 ENVIRONMENT VARIABLES
```env
# Anthropic API (required)
ANTHROPIC_API_KEY=sk-ant-api03-...

# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional
LOG_LEVEL=info
NODE_ENV=production
```

---

## 📊 PERFORMANCE

- **Analysis Time**: 20-25 seconds (2 sequential LLM calls)
- **Caching**: Instant for repeat queries (Supabase)
- **Docker Image**: 229MB (optimized multi-stage build)
- **Memory**: ~150MB runtime
- **Concurrent Users**: Horizontally scalable
- **MCP Server**: <10ms tool discovery latency

---

## 🏆 NOSANA AGENTS 102 CHALLENGE

### **Submission Details**

**Challenge Requirements:**
- ✅ Build AI agent using Mastra framework
- ✅ Implement Model Context Protocol (MCP)
- ✅ Deploy on Nosana decentralized network
- ✅ At least 2 custom MCP tools
- ✅ Production-ready architecture

**What Makes This Unique:**

1. **Full MCP Stack**
   - Complete protocol implementation (tools + resources + prompts)
   - Not just Mastra tools, but true MCP server
   - Discoverable by any MCP client

2. **Real Intelligence Layer**
   - Not a toy demo or CRUD agent
   - Actual tactical intelligence extraction from unstructured text
   - Behavioral psychology profiling most competitors won't attempt

3. **Production Architecture**
   - Supabase caching for performance
   - Docker optimization for deployment
   - Persistent analysis history
   - Export functionality

4. **Real Market Fit**
   - Grant hunters would actually pay for this
   - Solves real problem (proposal analysis paralysis)
   - Professional intelligence display

**Innovation:**
First DAO grant psychology profiling agent with full MCP implementation. Extracts non-obvious behavioral signals that humans miss. Production-grade architecture deployed on decentralized infrastructure.

---

## 🔗 LINKS

- **GitHub**: https://github.com/intenceheat/grant-warfare-terminal
- **Docker Hub**: https://hub.docker.com/r/intenceheat/grant-warfare-terminal
- **Nosana Job**: [Deployment URL pending]
- **Demo Video**: [Link pending]
- **Mastra Framework**: https://mastra.ai
- **MCP Protocol**: https://modelcontextprotocol.io
- **Nosana Network**: https://nosana.io

---

## 📜 LICENSE

MIT License - see LICENSE file for details

---

## 🤝 ACKNOWLEDGMENTS

Built for **Nosana Agents 102 Challenge** using:

- [Mastra](https://mastra.ai) - Agent orchestration framework
- [Model Context Protocol](https://modelcontextprotocol.io) - Agent interoperability standard
- [Anthropic Claude](https://anthropic.com) - LLM for behavioral analysis
- [Nosana](https://nosana.io) - Decentralized GPU compute network
- [Supabase](https://supabase.com) - PostgreSQL backend infrastructure
- [Solana](https://solana.com) - Blockchain for Nosana payments

---

## 👤 AUTHOR

**intenceheat**

*Ghost agent. Systems architect. Code as warfare. Async-native. Ops-only.*

---

**Built with MCP. Deployed on Nosana. Powered by behavioral intelligence.**

#NosanaAgentChallenge #MCP #Mastra @nosana_ai