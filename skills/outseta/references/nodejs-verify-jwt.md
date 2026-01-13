# JWT Token Verification Demo

## Purpose

Demonstrates how to verify Outseta JWT access tokens server-side using two different methods. This is essential for securing your application by ensuring tokens are valid before trusting their payload.

## What it does

- Prompts for a JWT access token to verify
- Offers choice between two verification methods:
  1. **JWK Set verification** - Uses your domain's public key to cryptographically verify the token
  2. **Profile Endpoint verification** - Makes an API call to verify the token is still valid
- Decodes and displays user information from the verified token
- Provides detailed logging and error handling for troubleshooting

## Use cases

- **API authentication** - Verify tokens in your backend before processing API requests
- **Middleware implementation** - Create authentication middleware for your web application
- **Security validation** - Ensure tokens haven't been tampered with or expired
- **User identification** - Extract user information from verified tokens for authorization
- **Token debugging** - Inspect and validate tokens during development

## What happens next?

- **Valid token**: The script will display user information extracted from the token and confirm it's verified
- **Invalid token**: An error message will be shown indicating why verification failed (expired, tampered, invalid format, etc.)
- **Network issues**: Appropriate error messages for connection problems or API errors

## Verification Methods Explained

### Method 1: JWK Set Verification

- **How it works**: Downloads your domain's public key from `https://your-domain.outseta.com/.well-known/jwks` and uses it to cryptographically verify the token signature
- **Pros**: Fast, works offline, cryptographically secure
- **Cons**: Requires the `jose` library, slightly more complex implementation

### Method 2: Profile Endpoint Verification

- **How it works**: Makes an API call to `/api/v1/profile` using the token; if the call succeeds, the token is valid
- **Pros**: Simple implementation, also returns additional user profile data
- **Cons**: Requires network call, slower than JWK verification

### Which method to choose?

- **Use JWK Set** for high-performance applications where you need to verify many tokens quickly
- **Use Profile Endpoint** when you also need fresh user profile data or prefer simpler implementation
- **Use both** for maximum security and additional profile information

## API Endpoints Used

- `GET /.well-known/jwks` – Retrieve the JSON Web Key Set for token verification
- `GET /api/v1/profile?fields=*` – Verify token and retrieve user profile information

## Core Code Examples

### JWK Set Verification

```javascript
import { jwtVerify, createRemoteJWKSet } from "jose";

// Create the remote JWK Set
const JWKS = createRemoteJWKSet(
  new URL(`https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/.well-known/jwks`),
);

// Verify the token
const { payload } = await jwtVerify(token, JWKS);

console.log("PersonUid:", payload.sub);
console.log("Email:", payload.email);
console.log("Name:", payload.name);
console.log("AccountUid:", payload["outseta:accountUid"]);
console.log("IsPrimary:", payload["outseta:isPrimary"]);
```

### Profile Endpoint Verification

```javascript
import { decodeJwt } from "jose";

// Make request to profile endpoint
const response = await fetch(
  `https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/api/v1/profile?fields=*`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

if (!response.ok) {
  throw new Error("Token verification failed");
}

const profile = await response.json();
const payload = decodeJwt(token); // Decode for additional info

console.log("PersonUid:", payload.sub, profile.Uid);
console.log("Email:", payload.email, profile.Email);
console.log("Avatar:", profile.ProfileImageS3Url);
```

## Security Notes

- Always verify JWT tokens before trusting their content
- Never expose tokens in client-side logs or URLs
