---
name: outseta
description: Outseta is an all-in-one operating system for SaaS founders, combining CRM, authentication, billing, and customer support into a single platform. It is designed to handle the "business logic" of a SaaS product so developers can focus on the "functional logic". Use when the user needs to integrate authentication, billing, or CRM features using Outseta.
---

# Outseta Synopsis

Outseta is an all-in-one operating system for SaaS founders, combining CRM, authentication, billing, and customer support. It is designed to handle the "business logic" of a SaaS product so developers can focus on the "functional logic."

## Core Architecture

### 1. Relational Data Model (B2B First)

Outseta's CRM is structured to support team-based SaaS out of the box:

- **Person:** An individual user identified by a `Uid`.
- **Account:** A company or team entity. This is where **Subscriptions** and **Billing** reside.
- **PersonAccount:** A join entity linking People to Accounts. This allows for complex relationships where one user can be part of multiple organizations.
- **Source of Truth:** Treat Outseta as the primary source of truth for identity and payment status.

### 2. Authentication & Security

- **JWT (JSON Web Tokens):** Outseta uses JWTs for session management. Outseta-specific claims are **namespaced**: `sub` is the person Uid, and `outseta:accountUid`, `outseta:planUid`, `outseta:isPrimary` carry account/plan context. There are no `PersonUid`/`AccountUid`/`planUid` claims — for plan gating, read `outseta:planUid`.
- **Verification:** Verify tokens server-side against Outseta's **JWKS (JSON Web Key Set)** at `/.well-known/jwks`. Outseta is also a standard OIDC provider — fetch its discovery document at `/.well-known/openid-configuration` and read `authorization_endpoint`/`token_endpoint`/`userinfo_endpoint`/`jwks_uri` from it rather than hardcoding.
- **Gated Content:** Use the Outseta script to automatically show/hide UI elements based on the user's subscription plan or login status using `data-o-*` attributes.

## Integration Patterns

### Frontend (React)

Use the official `@outseta/react` package instead of copying React templates from this toolkit.

```bash
npm install @outseta/react
```

Load Outseta's script in your app shell before rendering `OutsetaProvider`:

```html
<script>
  var o_options = {
    domain: "your-company.outseta.com",
    // Include the widget modules you render: auth, profile, support, emailList, leadCapture.
    load: "auth,profile,support,emailList,leadCapture,nocode",
  };
</script>
<script src="https://cdn.outseta.com/outseta.min.js" data-options="o_options"></script>
```

Use the package exports for auth state, widgets, gated routes, and add-on purchase flows:

```tsx
import {
  OutsetaProvider,
  ProtectedRoute,
  PurchaseAddonButton,
  useOutseta,
} from "@outseta/react";

function Header() {
  const { user, isLoading, openLogin, openSignup, openProfile, logout } = useOutseta();

  if (isLoading) return null;

  return user ? (
    <>
      <button onClick={() => openProfile({ tab: "profile" })}>Profile</button>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <>
      <button onClick={() => openSignup()}>Sign up</button>
      <button onClick={() => openLogin()}>Login</button>
    </>
  );
}

export function App() {
  return (
    <OutsetaProvider>
      <Header />
      <ProtectedRoute plans={["plan_uid"]}>
        <PremiumFeature />
      </ProtectedRoute>
      <PurchaseAddonButton addonUid="addon_uid">Buy add-on</PurchaseAddonButton>
    </OutsetaProvider>
  );
}
```

`@outseta/react` exports:

- `OutsetaProvider` and `useOutseta` for auth/user state.
- Headless auth/profile components: `AuthEmbed`, `AuthButton`, `LoginButton`, `SignupButton`, `ProfileEmbed`, `ProfileButton`, `LogoutButton`, `ProtectedRoute`, `AuthCta`, `UpgradeCta`, and `PurchaseAddonButton`.
- Headless support, email list, and lead capture components: `SupportEmbed`, `SupportButton`, `EmailListEmbed`, `EmailListButton`, `EmailListForm`, `LeadCaptureEmbed`, and `LeadCaptureButton`.
- `createClient` plus generated vanilla-React data hooks for Outseta REST API access.

The generated API hooks do not require an external data-fetching library or provider. They fetch on mount, expose `refetch`, and intentionally do not provide cross-component caching, request deduping, or background refetching. Create browser API clients with a user bearer `accessToken`, and pass the client through each hook's `request` option:

```tsx
import { createClient, useAccountGetAllAccounts } from "@outseta/react";

const client = createClient({
  subdomain: "your-company",
  accessToken,
});

const { data, error, isLoading, refetch } = useAccountGetAllAccounts(undefined, {
  request: client,
});
```

Never expose Outseta API key credentials in browser code.

### Frontend (No-Code/Low-Code and plain HTML)

- **Magic Script**: Define `o_options` for your Outseta domain and include `<script src="https://cdn.outseta.com/outseta.min.js" data-options="o_options"></script>` in your app shell.
- **Widgets**: Trigger widgets via data attributes (e.g., `data-o-auth="1"`) or the `Outseta` global object.
- **Lifecycle Events**: Use `Outseta.on('event', callback)` to react to login, logout, or profile updates.
- **Gated Content**: Use the Outseta script to automatically show/hide UI elements based on the user's subscription plan or login status using `data-o-*` attributes (e.g., `data-o-anonymous="1"`, `data-o-authenticated="1"`). In React apps, prefer `@outseta/react` state and components for more reliable SPA behavior.

### Backend (Node.js)

Use the official `@outseta/node-sdk` package instead of copying Node.js templates from this toolkit.

```bash
npm install @outseta/node-sdk
```

The package exports helpers for server-side API clients, JWT verification, webhook signature verification, Express webhook routes, generating user access tokens, and usage-based billing:

```ts
import {
  createClient,
  createOutsetaWebhookHandler,
  generateAccessToken,
  outsetaWebhookTextParserOptions,
  trackUsage,
  verifyJwt,
} from "@outseta/node-sdk";
import express from "express";

const adminClient = createClient({
  subdomain: process.env.OUTSETA_SUBDOMAIN!,
  apiKey: process.env.OUTSETA_API_KEY!,
  apiSecret: process.env.OUTSETA_API_SECRET!,
});

const payload = await verifyJwt(userAccessToken, {
  subdomain: process.env.OUTSETA_SUBDOMAIN!,
});

const generatedToken = await generateAccessToken(adminClient, "person@example.com");

await trackUsage(adminClient, {
  accountUid: "account_uid",
  addOnUid: "addon_uid",
  amount: 1,
});

const app = express();
app.post(
  "/outseta/webhook",
  express.text(outsetaWebhookTextParserOptions),
  createOutsetaWebhookHandler({
    signingKey: process.env.OUTSETA_WEBHOOK_SIGNING_KEY!,
    async onWebhook(payload) {
      // Handle Activity Notification payload.
    },
  }),
);
```

Important backend notes:

- Use API key credentials only on the server.
- For user-scoped server requests, create a client with `{ subdomain, accessToken }`.
- Verify webhook signatures against the exact raw request body. In Express, use `express.text(outsetaWebhookTextParserOptions)` for the webhook route before `createOutsetaWebhookHandler`.
- For full generated REST API functions, use `@outseta/api-client` and pass SDK clients via `withClient(client)` when needed.

### REST API

- Use for server-to-server communication, custom onboarding, or administrative tasks.
- Base URL: `https://your-domain.outseta.com/api/v1/`

See [REST API](references/rest-api.md).

## Key Developer Concepts

- **Uid:** The unique identifier for any entity in Outseta. Use this as the foreign key in your local database (e.g., Convex).
- **Account Stage:** Tracks where a customer is in their lifecycle (e.g., Trialing, Active, Past Due, Cancelled).
- **Embeds:** The term Outseta uses for its overlay widgets (Sign up, Login, Profile, Help Desk).

## MCP Server

The Outseta MCP Server can be used to further gain understanding of the Outseta concepts and how to use it through its knowledge base, support examples, and REST API reference documentation.

- Knowledge Base
- REST API Reference
- Examples (if you can't find an answer in the knowledge base)

## Embed Examples (pure JS/HTML only)

These templates remain in this toolkit for non-React or low-code integrations:

- **Login:** Standard login widget. See [`login.html`](templates/login.html)
- **Signup:** Registration widget with optional defaults. See [`signup.html`](templates/signup.html)
- **Profile:** User profile and subscription management. See [`profile.html`](templates/profile.html)
- **Logout:** Logout button and link patterns. See [`logout.html`](templates/logout.html)
- **Lead Capture:** Custom lead capture forms. See [`leadcapture.html`](templates/leadcapture.html)
- **Email List:** Email list subscription forms. See [`emaillist.html`](templates/emaillist.html)
- **Support:** Support ticket and knowledge base integration. See [`support.html`](templates/support.html)
