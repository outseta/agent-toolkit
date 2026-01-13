# Outseta Coding Agents

This repository contains a collection of skills, templates, and references designed to help coding agents (like Roo) integrate [Outseta](https://www.outseta.com/) into your applications. Outseta is an all-in-one operating system for SaaS founders, combining CRM, authentication, billing, and customer support.

## Key Features

- **Authentication**: Seamless integration using Outseta's "Magic Script" and embeddable widgets for login, sign-up, and profile management.
- **Subscriptions & Billing**: Manage plans and gate features based on subscription status using JWT claims or the REST API.
- **Data Sync**: Synchronize user data with local databases (like [Convex](https://www.convex.dev/)) using Outseta UIDs as foreign keys and webhooks for real-time updates.
- **REST API**: Advanced server-to-server communication for custom onboarding flows and administrative tasks.
- **Framework Support**: Ready-to-use templates for **React** and **Node.js**.

## Project Structure

- [`AGENTS.md`](AGENTS.md): Core rules and principles for agents working with Outseta.
- [`skills/outseta/`](skills/outseta/): The primary skill definition and resources.
  - [`SKILL.md`](skills/outseta/SKILL.md): Detailed synopsis of Outseta concepts and integration patterns.
  - `templates/`: Code snippets for React components, Node.js handlers, and HTML embeds.
  - `references/`: Detailed guides for JWT verification, usage tracking, and API usage.

## Setup & Configuration

### 1. Coding Agent Setup
To get the most out of these skills, ensure your coding agent (e.g., Roo, Claude Code, Cursor) is configured to recognize the project structure:
- **Workspace**: Open this repository as your root workspace.
- **Context**: The agent should automatically read [`AGENTS.md`](AGENTS.md) at the start of a session to understand the project's core integration rules.
- **Skills**: Ensure the agent has permission to explore the `skills/` directory to find relevant templates and documentation.

### 2. Outseta Remote MCP Server
This project benefits from a dedicated MCP (Model Context Protocol) server that provides real-time access to Outseta's knowledge base and API references.

To add the Outseta Remote MCP server to your agent configuration:

#### For Claude Code
Add to your `~/.claude.json` or via the CLI:

```json
{
  "mcpServers": {
    "outseta": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://n8n.havelaar.ltd/mcp/outseta"
      ]
    }
  }
}
```

#### For Cursor
1. Open **Cursor Settings** (`Cmd + Shift + J` or `Ctrl + Shift + J`).
2. Navigate to **General** > **MCP**.
3. Click **+ Add New MCP Server**.
4. Enter the following:
   - **Name**: `outseta`
   - **Type**: `command`
   - **Command**: `npx -y mcp-remote https://n8n.havelaar.ltd/mcp/outseta`

## External Resources

- [Agents.md](https://agents.md/) - Standard for defining agent behaviors.
- [Agent Skills](https://agentskills.io/home) - A directory of skills for AI agents.
- [Outseta Documentation](https://www.outseta.com/docs) - Official Outseta help center.

## Getting Started

1. **Initialize**: Open this project in your IDE.
2. **Configure MCP**: Set up the Outseta Remote MCP server as described above.
3. **Prompt the Agent**: Start by asking the agent to "Review the Outseta integration rules in AGENTS.md and the outseta skill in SKILL.md".
