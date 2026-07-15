import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { WHATSAPP_DISPLAY, WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/contact";

export default defineTool({
  name: "get_contact_info",
  title: "Get contact info",
  description: "Returns Arte Manual's public contact details (WhatsApp and Instagram).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: `WhatsApp: ${WHATSAPP_DISPLAY} (${WHATSAPP_URL})\nInstagram: ${INSTAGRAM_URL}`,
      },
    ],
    structuredContent: {
      whatsapp: { display: WHATSAPP_DISPLAY, url: WHATSAPP_URL },
      instagram: INSTAGRAM_URL,
    },
  }),
});

// z is imported to satisfy tooling patterns; not required for empty schema.
void z;
