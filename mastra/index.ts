import { Mastra } from "@mastra/core/mastra";
import { grantWarfareAgent } from "./agents";

export const mastra = new Mastra({
  agents: { grantWarfareAgent }
});
