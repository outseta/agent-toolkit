# Outseta Agent Toolkit

A collection of skills, templates, and curated documentation for AI coding agents to integrate SaaS applications with [Outseta](https://www.outseta.com/) - the all-in-one platform for authentication, billing, CRM, and customer support.

## Quick Start

1. Install the skill: `npx skills add outseta/agent-toolkit`
2. Add agent instructions (see [below](#2-add-agent-instructions))
3. Add MCP servers (see [below](#3-add-mcp-servers))
4. Ask your agent: *"Review the Outseta skill and help me integrate authentication"*

## Installation

### 1. Install the Skill

Install the Outseta skill using the [skills CLI](https://skills.sh):

```bash
npx skills add outseta/agent-toolkit
```

This installs the templates and documentation into your project's `.skills/` directory. See [agentskills.io](https://agentskills.io/home) for more on agent skills.

<details>
<summary><strong>Manual installation</strong></summary>

If you prefer not to use the skills CLI, copy the `skills/outseta/` directory from this repository into your project's `.skills/` or `skills/` folder.

</details>

### 2. Add Agent Instructions

Download the [AGENTS.md](https://raw.githubusercontent.com/outseta/agent-toolkit/main/AGENTS.md) file to your project root. This file provides core integration rules that agents will follow when working with Outseta.

```bash
curl -O https://raw.githubusercontent.com/outseta/agent-toolkit/main/AGENTS.md
```

<details>
<summary><strong>Claude Code users</strong></summary>

Also download [CLAUDE.md](https://raw.githubusercontent.com/outseta/agent-toolkit/main/CLAUDE.md) for Claude-specific guidance:

```bash
curl -O https://raw.githubusercontent.com/outseta/agent-toolkit/main/CLAUDE.md
```

</details>

### 3. Add MCP Servers

#### Outseta Knowledge Base MCP

Provides real-time access to Outseta's knowledge base and API references.

> This toolkit repository contains the curated skill, templates, and references used during implementation.

<details>
<summary><strong>Claude Code</strong></summary>

Add to your `~/.claude.json`:

```json
{
  "mcpServers": {
    "outseta": {
      "url": "https://mcp.outseta.com"
    }
  }
}
```
This will use the built-in OAuth authentication with Claude Code, it will take you to the Outseta website to log in.

If for some reason you don't want to use OAuth authentication, you can use API keys as well. See: [Outseta MCP Server for AI Assistants](https://go.outseta.com/support/kb/articles/z9M2EyW4/outseta-mcp-server-for-ai-assistants)

```json
{
  "mcpServers": {
    "outseta": {
      "url": "https://mcp.outseta.com",
      "headers": {
        "Authorization": "Outseta <key>:<secret>",
        "X-Outseta-Subdomain": "<subdomain>.outseta.com"
      }
    }
  }
}
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

Add to your `~/.cursor/mcp.json` (or `.cursor/mcp.json` in your project):

```json
{
  "mcpServers": {
    "outseta": {
      "url": "https://mcp.outseta.com"
    }
  }
}
```

Cursor will prompt you to authenticate via OAuth on the Outseta website the first time the server is used.

If for some reason you don't want to use OAuth authentication, you can use API keys as well. See: [Outseta MCP Server for AI Assistants](https://go.outseta.com/support/kb/articles/z9M2EyW4/outseta-mcp-server-for-ai-assistants)

```json
{
  "mcpServers": {
    "outseta": {
      "url": "https://mcp.outseta.com",
      "headers": {
        "Authorization": "Outseta <key>:<secret>",
        "X-Outseta-Subdomain": "<subdomain>.outseta.com"
      }
    }
  }
}
```

</details>

## Key Features

- **Authentication** - Outseta's "Magic Script" and embeddable widgets for login, sign-up, and profile management
- **Subscriptions & Billing** - Gate features based on subscription status using JWT claims or the REST API
- **Data Sync** - Use Outseta UIDs as foreign keys and webhooks for real-time updates
- **REST API** - Server-to-server communication for custom onboarding and admin tasks
- **Framework Templates** - Ready-to-use code for React and Node.js

## Project Structure

```
├── AGENTS.md                    # Core integration rules for agents
├── CLAUDE.md                    # Claude-specific guidance
└── skills/outseta/
    ├── SKILL.md                 # Outseta concepts and patterns
    ├── templates/               # React, Node.js, and HTML snippets
    └── references/              # JWT, usage tracking, API guides
```

## Example Project

See [Outseta Vibe Coding Courses CMS](https://github.com/outseta/outseta-vibe-coding-CMS) for a complete project built with Roo Code using this toolkit.

## Resources

- [Outseta Knowledge Base](https://go.outseta.com/support/kb/categories) - Official help center
- [Agents.md](https://agents.md/) - Standard for agent behaviors
- [Agent Skills Spec](https://agentskills.io/home) - Specification for agent skills
- [Skills Directory](https://skills.sh) - Browse and install agent skills
