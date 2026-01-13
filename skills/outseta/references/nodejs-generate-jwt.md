# Generate User JWT Token Demo

## Purpose

Demonstrates how to generate a JWT access token for a user with the Outseta API using admin credentials. This script allows you to generate a token for any user by specifying their email address—no password required.

## What it does

- Prompts for a user's email address
- Uses your Outseta API credentials (API Key, Secret, and Subdomain) to generate a JWT access token for the specified user
- Displays the JWT access token on success
- Provides detailed logging and error handling

## Use cases

- Testing authentication flows
- Generating a JWT for use in other API calls or demos
- Acting on behalf of a user in server-side automation
- Integrating Outseta with external auth providers (for example, Auth0, custom auth systems)
  - User logs in via the external auth provider
  - Your system verifies the external auth provider's auth token
  - Before generating an Outseta JWT token for the user, so they can interact with Outseta in the same way as if they were logged in via Outseta Auth.

## What happens next?

- If the email is valid and the user exists, the script will display the JWT access token.
- If the email is invalid or the user does not exist, an error message will be shown.

## API Endpoints Used

- `POST /api/v1/tokens` – Generate a JWT access token for a user (admin credentials required)

## Core Code Example

```javascript
const payload = {
  username: email,
};
const response = await fetch(`https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/api/v1/tokens`, {
  method: "POST",
  headers: {
    Authorization: `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
```
