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

Two MCP servers may be available. Use them as follows:

### Outseta Knowledge Base MCP (`outseta`)

Use for research and documentation lookup:
- Finding Outseta concepts and best practices
- Looking up API endpoint details and parameters
- Understanding embed widget options and configuration

### Outseta Admin MCP (`outseta-admin`)

Use for direct account operations:
- Querying and managing CRM data (people, accounts, deals)
- Creating or updating subscriptions and billing
- Managing email lists and marketing campaigns
- Bulk data operations or migrations
- Automating administrative tasks

**Important:** The Admin MCP connects to a live Outseta account. Always confirm destructive operations with the user before executing them.
