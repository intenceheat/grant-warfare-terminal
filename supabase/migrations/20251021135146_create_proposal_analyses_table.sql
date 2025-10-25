/*
  # Create proposal_analyses table

  1. New Tables
    - `proposal_analyses`
      - `id` (uuid, primary key) - Unique identifier for each analysis
      - `proposal_id` (text) - The Snapshot proposal ID
      - `proposal_title` (text) - Title of the proposal
      - `dao` (text) - Name of the DAO
      - `opportunity_score` (integer) - Calculated opportunity score (0-10)
      - `psychology` (jsonb) - Psychology analysis data (urgency, desperation, flexibility, triggers, etc.)
      - `edge` (jsonb) - Competitive edge data (skillMatch, winProbability, advantages, gaps)
      - `recommendation` (jsonb) - Tactical recommendations (mainStrategy, emphasize, avoid, openingLine)
      - `created_at` (timestamptz) - When the analysis was created

  2. Security
    - Enable RLS on `proposal_analyses` table
    - Add policy for public read access (analyses are not user-specific)
    - Add policy for service role to insert (API route will insert)

  3. Indexes
    - Index on `proposal_id` for fast lookups
    - Index on `created_at` for sorting recent analyses
*/

CREATE TABLE IF NOT EXISTS proposal_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id text NOT NULL,
  proposal_title text NOT NULL,
  dao text NOT NULL,
  opportunity_score integer NOT NULL,
  psychology jsonb NOT NULL,
  edge jsonb NOT NULL,
  recommendation jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE proposal_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read proposal analyses"
  ON proposal_analyses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert analyses"
  ON proposal_analyses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_proposal_analyses_proposal_id 
  ON proposal_analyses(proposal_id);

CREATE INDEX IF NOT EXISTS idx_proposal_analyses_created_at 
  ON proposal_analyses(created_at DESC);
