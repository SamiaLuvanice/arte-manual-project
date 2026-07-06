import { defineMcp } from "@lovable.dev/mcp-js";
import getContactInfo from "./tools/get-contact-info";
import getBrandStats from "./tools/get-brand-stats";

export default defineMcp({
  name: "arte-manual-mcp",
  title: "Arte Manual MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Arte Manual crochê artisan site. Use `get_contact_info` to reach the artisan and `get_brand_stats` for headline metrics.",
  tools: [getContactInfo, getBrandStats],
});
