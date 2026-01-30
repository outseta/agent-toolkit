# Outseta Integration

This repository is the **Outseta Agent Toolkit** - a collection of templates, skills, and documentation for integrating SaaS applications with Outseta (authentication, billing, CRM, customer support).

## Core Integration Rules

- **Authentication**: Outseta is the primary source of truth for user identity. Use the Outseta "Magic Script" and embed widgets for login, sign-up, and profile management.
- **Subscriptions**: Billing and subscription plans are managed in Outseta. Access to features should be gated based on the user's subscription status retrieved from Outseta JWT claims or the REST API.
- **Data Sync**: Use Outseta UIDs as foreign keys in the local database. Sync data using webhooks (Activity Notifications).
- **REST API**: For advanced use cases, interact with Outseta's REST API for server-to-server communication, custom onboarding flows, or administrative tasks, authorization and content protection.

## Before Implementing

Always check [`skills/outseta/SKILL.md`](skills/outseta/SKILL.md) for existing templates and patterns before writing new Outseta integration code. The skill contains ready-to-use examples for:

- Signup and login embeds and popup dialogs
- Lead capture forms and email list subscription forms
- React AuthProvider, protected routes, and widgets
- Node.js JWT verification and webhook handling
- Usage-based billing implementation

## MCP Servers

### Outseta Knowledge Base MCP

Provides real-time access to Outseta knowledge base and API references. Use this for learning about Outseta concepts, finding documentation, and understanding API endpoints:

```json
{
  "mcpServers": {
    "outseta": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://n8n-webhooks.outseta.com/mcp/outseta"]
    }
  }
}
```

### Outseta Admin MCP

Enables direct interaction with an Outseta account for administrative operations. Use this when you need to:
- Query and manage CRM data (people, accounts, deals)
- Create or update subscriptions and billing information
- Manage email lists and marketing campaigns
- Perform bulk data operations or migrations
- Automate administrative tasks

```json
{
  "mcpServers": {
    "outseta-admin": {
      "command": "npx",
      "args": ["-y", "@outseta/admin-mcp-server"],
      "env": {
        "OUTSETA_SUBDOMAIN": "your-subdomain",
        "OUTSETA_API_KEY": "your-api-key",
        "OUTSETA_API_SECRET": "your-api-secret"
      }
    }
  }
}
```

**Note:** The Admin MCP requires API credentials from your Outseta account (Settings > Integrations > API Keys). Keep these credentials secure and never commit them to version control.
