# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is the **Outseta Agent Toolkit** - a collection of skills, templates, and documentation for AI coding agents to integrate SaaS applications with Outseta (authentication, billing, CRM, customer support).

This is NOT an application codebase - it's a reference toolkit containing templates and documentation.

## Key Files to Read First

- `AGENTS.md` - Core rules for Outseta integration
- `skills/outseta/SKILL.md` - Detailed Outseta concepts and integration patterns

## Structure

- `skills/outseta/templates/` - Code snippets for React, Node.js, and HTML embeds
- `skills/outseta/references/` - Detailed guides for JWT, usage tracking, API usage

## Outseta Integration Rules

1. **Authentication**: Outseta is the source of truth for user identity. Use the "Magic Script" and embed widgets for login/sign-up/profile.
2. **Subscriptions**: Gate features based on subscription status from JWT claims or REST API.
3. **Data Sync**: Use Outseta UIDs as foreign keys. Sync via webhooks (Activity Notifications).
4. **REST API**: For server-to-server communication, custom onboarding, or admin tasks.

## MCP Server

An Outseta MCP server provides real-time access to Outseta knowledge base and API references:

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

## When Working on Outseta Integrations

Always check `skills/outseta/` for existing templates before implementing new code. The skill contains ready-to-use patterns for:
- Login/signup embeds and popups
- Lead capture and email subscription forms
- React AuthProvider and protected routes
- Node.js JWT verification and webhook handling
- Usage-based billing implementation
