# Outseta Agent Toolkit

A collection of skills, curated documentation, and plain HTML templates for AI coding agents to integrate SaaS applications with [Outseta](https://www.outseta.com/) - the all-in-one platform for authentication, billing, CRM, and customer support.

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

This installs the Outseta skill, plain HTML templates, and curated references into your project's `.skills/` directory. See [agentskills.io](https://agentskills.io/home) for more on agent skills.

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

#### Outseta MCP

Provides real-time access to Outseta's knowledge base and REST API reference, plus read and write access to the data in your Outseta account.

The server is at `https://agent.outseta.com/mcp` and uses OAuth only: your client opens the Outseta login page the first time it connects. API-key headers are not accepted by this server.

> This toolkit repository contains the curated skill, plain HTML templates, and references used during implementation. React and Node.js implementation examples live in the official npm packages listed below.

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude mcp add --transport http outseta https://agent.outseta.com/mcp
```

Or add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "outseta": {
      "type": "http",
      "url": "https://agent.outseta.com/mcp"
    }
  }
}
```

Run `/mcp` in Claude Code to complete the OAuth login on the Outseta website.

</details>

<details>
<summary><strong>Cursor</strong></summary>

Add to `~/.cursor/mcp.json` (or `.cursor/mcp.json` in your project):

```json
{
  "mcpServers": {
    "outseta": {
      "url": "https://agent.outseta.com/mcp"
    }
  }
}
```

Cursor will prompt you to authenticate via OAuth on the Outseta website the first time the server is used.

</details>

## Key Features

- **Authentication** - Outseta's "Magic Script" and embeddable widgets for login, sign-up, and profile management
- **Subscriptions & Billing** - Gate features based on subscription status using JWT claims or the REST API
- **Data Sync** - Use Outseta UIDs as foreign keys and webhooks for real-time updates
- **REST API** - Server-to-server communication for custom onboarding and admin tasks
- **Official SDK Guidance** - Instructions for `@outseta/react` and `@outseta/node-sdk`
- **Plain HTML Templates** - Ready-to-use embed snippets for non-React or low-code integrations

## Official Packages for App Code

React and Node.js examples/templates now live in the official npm packages:

```bash
npm install @outseta/react
npm install @outseta/node-sdk
```

Use `skills/outseta/SKILL.md` for package usage guidance, exported helpers/components, and notes about loading the Outseta script, verifying JWTs, handling webhooks, and tracking usage.

## Project Structure

```
├── AGENTS.md                    # Core integration rules for agents
├── CLAUDE.md                    # Claude-specific guidance
└── skills/outseta/
    ├── SKILL.md                 # Outseta concepts and patterns
    ├── templates/               # Plain HTML embed snippets
    └── references/              # Curated REST API guide
```

## Example Project

See [Outseta Vibe Coding Courses CMS](https://github.com/outseta/outseta-vibe-coding-CMS) for a complete project built with Roo Code using this toolkit.

## Resources

- [Outseta Knowledge Base](https://go.outseta.com/support/kb/categories) - Official help center
- [Agents.md](https://agents.md/) - Standard for agent behaviors
- [Agent Skills Spec](https://agentskills.io/home) - Specification for agent skills
- [Skills Directory](https://skills.sh) - Browse and install agent skills
