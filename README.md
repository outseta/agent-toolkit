# Outseta Agent Toolkit

A collection of skills, templates, and documentation for AI coding agents to integrate SaaS applications with [Outseta](https://www.outseta.com/) - the all-in-one platform for authentication, billing, CRM, and customer support.

## Quick Start

1. Install the skill: `npx skills add outseta/agent-toolkit`
2. Add the MCP server (see [below](#2-add-the-mcp-server))
3. Ask your agent: *"Review the Outseta skill and help me integrate authentication"*

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

### 2. Add the MCP Server

The Outseta MCP server provides real-time access to Outseta's knowledge base and API references.

<details>
<summary><strong>Claude Code</strong></summary>

Add to your `~/.claude.json`:

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

</details>

<details>
<summary><strong>Cursor</strong></summary>

1. Open **Cursor Settings** (`Cmd + Shift + J` / `Ctrl + Shift + J`)
2. Navigate to **General** > **MCP**
3. Click **+ Add New MCP Server**
4. Enter:
   - **Name**: `outseta`
   - **Type**: `command`
   - **Command**: `npx -y mcp-remote https://n8n-webhooks.outseta.com/mcp/outseta`

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
