// os1000/src/entry/welcome.ts
import { getSourceContext } from "./referrer";
import { gtagEvent } from "../telemetry/ga4";

export function showWelcomeIfNeeded(render: (msg: string) => void) {
  const ctx = getSourceContext();
  if (ctx.fromLumina) {
    render("Welcome from Lumina — type `help` or `play intro-os-overture` to begin.");
    gtagEvent('os1000_welcome_customized', {
      source: 'lunadarkside.com',
      campaign: ctx.campaign,
      content: ctx.content
    });
  }
}