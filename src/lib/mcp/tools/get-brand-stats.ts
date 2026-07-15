import { defineTool } from "@lovable.dev/mcp-js";
import { STATS } from "@/lib/constants";

export default defineTool({
  name: "get_brand_stats",
  title: "Get brand stats",
  description: "Returns Arte Manual's headline stats (pieces created, happy clients, years of dedication).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: STATS.map((s) => `${s.number}${s.suffix} ${s.label}`).join("\n"),
      },
    ],
    structuredContent: { stats: STATS },
  }),
});
