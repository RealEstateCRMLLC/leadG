# leadG — VoiceForge AI (Unified AI Voice Sales Platform)

AI voice sales platform for real estate lead generation: real-time conversational voice agents (Twilio + Vapi), omnichannel campaigns (voice/SMS/email/direct mail), a CRM with state-machine workflows, geospatial prospecting, and an MCP server for external AI agents. Built as part of the RealEstateCRM project family for Excel Legacy Realty Group.

## Status

**Active development.** Version 2.0.0 per `CHANGELOG.md` (2026-09-22 merge release) — note `package.json` still says 1.0.0, which is stale. Last commit 2026-11-12 (missing Tailwind/PostCSS config fix). Recent work: in-browser "Talk to Riley" voice via the Vapi Web SDK (Oct 22), Twilio/SendGrid/Lob credential fallbacks (Oct 22), and removal of all mock data so provider failures and LLM date extraction surface honestly (Oct 21).

This repo merges two projects: **VoiceForge AI** (leadG, the voice engine) and **Jules AI Real Estate Concierge** (realestateleadcaller, the CRM/workflow side). See `MERGE_GUIDE.md` for the integration points.

## What it does

### AI voice engine (from VoiceForge AI)

- Twilio SIP/PSTN telephony with inbound/outbound calling; OpenAI GPT-4o conversation engine
- In-browser voice ("Talk to Riley") via the Vapi Web SDK
- ElevenLabs/Deepgram STT/TTS voice pipeline; a ReflectionEngine that adapts objection handling from post-call transcripts
- Native WebRTC warm transfers via `@twilio/voice-sdk` (floating dialer widget)

### Campaigns & CRM (from Jules AI Concierge)

- Omnichannel sequences (BullMQ + Redis): automatic SMS (Twilio) or email (SendGrid) fallback on voicemail/drop-off
- Reactive state-machine workflows (not linear drips), including a "Default Aggressive" 10-Day Blitz; visual drag-and-drop workflow builder (Inngest-backed)
- Direct mail automation via Lob (Inngest background jobs)
- Knowledge-base context injection (agent-written facts into voice AI prompts); mid-call tool execution (Google Calendar + DB writes during calls via Vapi webhooks)
- Bi-directional Follow Up Boss integration; sentiment analysis (OpenAI Structured Outputs) that bumps urgency, marks DNC, auto-pauses workflows

### Prospecting & platform

- Geospatial prospecting: Nominatim geocoding, Circle Prospecting map (react-leaflet), geographic CSV export, SSE real-time map updates
- Predictive ML lead scoring; dashboard KPIs (conversion, DNC, connect rate, appointments)
- Multi-tenant data isolation (Prisma userId-scoped); Stripe billing for API minute usage
- MCP server for external AI agents (Pages Router SSE transport — see `MERGE_GUIDE.md` for a critical constraint)

## Stack

Next.js 14 (App Router) + React + Tailwind; TypeScript; Prisma + PostgreSQL (SQLite for dev); BullMQ + Redis; Inngest; Twilio (Voice, SMS, WebRTC); Vapi; OpenAI; ElevenLabs; Deepgram; Lob; Stripe; SendGrid; Jest tests. Docker Compose for Postgres + Redis.

## What's working / what's not

- The voice engine, campaigns, workflows, direct mail, and prospecting features are implemented across the codebase, per the v2.0.0 merge changelog and the Oct 2026 commits. The Oct 21 mock-data removal means missing API keys or provider failures now fail loudly instead of producing fake output.
- No production deployment is documented in this repo — `DEPLOY.md` exists, but there is no live URL, uptime, or user evidence in the repo itself. The app is built by the main RealEstateCRM repo's CI (leadG job), which was green as of Nov 12, 2026 (RealEstateCRM v0.63.6). Locally it runs on port 3001.
- Housekeeping issues: `package.json` version (1.0.0) disagrees with `CHANGELOG.md` (v2.0.0); a `.env.production.local` file is committed to the repo and should not be (production environment files do not belong in version control — verify no live secrets are exposed and remove it).
- Live-service behavior (real calls, real mail, real billing) depends on API keys configured via `.env` — no evidence in the repo that the full chain has run end-to-end against live services.

## Relationship to RealEstateCRM

This is a satellite service of [RealEstateCRM](https://github.com/RealEstateCRMLLC/RealEstateCRM) — the AI voice-calling and campaign engine that complements the main CRM. It is a separate service, not part of the main CRM codebase. (Note: the Jules concierge code merged here came from the `realestateleadcaller` repo, which still exists separately — see that repo's README.)

## Running it

```bash
npm install
docker-compose up -d db redis   # start dependencies
npx prisma db push
npm run dev
```

Copy `.env.example` to `.env` and fill in API keys (Twilio, Vapi, OpenAI, DeepSeek, SendGrid, Lob, Stripe). See `DEPLOY.md` for deployment.

## Documentation

| File | Purpose |
|---|---|
| `MERGE_GUIDE.md` | Integration points between the merged projects |
| `VISION.md` | Product vision and design principles |
| `ROADMAP.md` | Development phases and milestones |
| `CHANGELOG.md` | Version history |
| `DEPLOY.md` | Deployment strategies |

## Links

- Main CRM: https://github.com/RealEstateCRMLLC/RealEstateCRM
- Org: https://github.com/RealEstateCRMLLC
