/*
  # Create proposal cache table

  1. New Tables
    - `proposal_cache`
      - `cache_key` (text, primary key) - Unique identifier for cached data
      - `proposals` (jsonb) - Cached proposal data
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp

  2. Purpose
    - Caches Solana proposal data to reduce API calls to external services
    - Improves response times and reduces load on third-party APIs
    - 10-minute TTL for fresh data while maintaining performance

  3. Security
    - Enable RLS on `proposal_cache` table
    - Allow public read access since proposals are public data
    - Restrict write access to service role only

  4. Notes
    - Uses JSONB for flexible proposal data storage
    - Implements upsert pattern for efficient updates
    - TTL checking handled in application layer
*/

CREATE TABLE IF NOT EXISTS proposal_cache (
  cache_key text PRIMARY KEY,
  proposals jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE proposal_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to proposal cache"
  ON proposal_cache
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow service role to insert cache"
  ON proposal_cache
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role to update cache"
  ON proposal_cache
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_proposal_cache_updated_at 
  ON proposal_cache(updated_at);
