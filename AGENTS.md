# Outseta Integration

This repository is the **Outseta Agent Toolkit** - a collection of skills, documentation, and plain HTML templates for integrating SaaS applications with Outseta (authentication, billing, CRM, customer support).

This is **not** an application codebase. It is a reference toolkit for agents, containing Outseta integration guidance, curated references, and reusable plain HTML embed templates.

## Key Files and Structure

- `AGENTS.md` - Core rules for Outseta integration and repository guidance.
- `skills/outseta/SKILL.md` - Detailed Outseta concepts, integration patterns, official package guidance, and available HTML templates.
- `skills/outseta/templates/` - Plain HTML embed snippets for non-React or low-code integrations.
- `skills/outseta/references/` - Curated REST API guidance.
- React and Node.js examples now live in `@outseta/react` and `@outseta/node-sdk`; use `skills/outseta/SKILL.md` for package usage guidance.

## Core Integration Rules

- **Authentication**: Outseta is the primary source of truth for user identity. Use the Outseta "Magic Script" and embed widgets for login, sign-up, and profile management.
- **Subscriptions**: Billing and subscription plans are managed in Outseta. Access to features should be gated based on the user's subscription status retrieved from Outseta JWT claims or the REST API.
- **Data Sync**: Use Outseta UIDs as foreign keys in the local database. Sync data using webhooks (Activity Notifications).
- **REST API**: For advanced use cases, interact with Outseta's REST API for server-to-server communication, custom onboarding flows, or administrative tasks, authorization and content protection.

## Before Implementing

Always check [`skills/outseta/SKILL.md`](skills/outseta/SKILL.md) for current package guidance and plain HTML templates before writing new Outseta integration code. The skill covers:

- Signup and login embeds and popup dialogs
- Lead capture forms and email list subscription forms
- React integration with `@outseta/react`
- Node.js backend integration with `@outseta/node-sdk`
- REST API and MCP lookup guidance

## MCP Server

Use the Outseta MCP server whenever you can if it is available as follows:

Use for research and documentation lookup:
- Finding Outseta concepts and best practices
- Looking up API endpoint details and parameters
- Understanding embed widget options and configuration

Use for direct account operations:
- Querying and managing CRM data (people, accounts, deals)
- Creating or updating subscriptions and billing
- Managing email lists and marketing campaigns
- Bulk data operations or migrations
- Automating administrative tasks

**Important:** The MCP connects to a live Outseta account. Always confirm destructive operations with the user before executing them.
