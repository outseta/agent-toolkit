import "dotenv/config";
import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";

/**
 * Verifies an Outseta JWT access token using the Public JWT Key (JWK) set
 * @param {string} token - The JWT access token to verify
 * @returns {Promise<Object>} - The verified payload
 */
export async function verifyWithJWKSet(token) {
  try {
    console.debug("🔍 Verifying token with JWK Set...");

    // Create the remote JWK Set
    // NOTE: For production applications that verify many tokens, consider
    // implementing caching with an appropriate TTL to reduce overhead
    const JWKS = createRemoteJWKSet(
      new URL(`https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/.well-known/jwks`),
    );

    // Verify the token
    const { payload } = await jwtVerify(token, JWKS);

    console.debug("✅ Token verified successfully with JWK Set");
    console.debug("\n--- JWT Payload ---");
    console.debug(JSON.stringify(payload, null, 2));
    console.debug("--------------------\n");

    return payload;
  } catch (error) {
    throw new Error(`JWK Set verification failed: ${error.message}`);
  }
}

/**
 * Verifies an Outseta JWT access token using the profile endpoint
 * @param {string} token - The JWT access token to verify
 * @returns {Promise<Object>} - Object containing both the decoded payload and profile data
 */
export async function verifyWithProfileEndpoint(token) {
  try {
    console.debug("🔍 Verifying token with Profile endpoint...");

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Profile endpoint verification failed: [${response.status}] ${
          errorData.ErrorMessage || errorData.Message || response.statusText
        }`,
      );
    }

    const profile = await response.json();

    // Decode the JWT payload for additional information
    const payload = decodeJwt(token);

    console.debug("✅ Token verified successfully with Profile endpoint");
    console.debug("\n--- Profile Response ---");
    console.debug(JSON.stringify(profile, null, 2));
    console.debug("--------------------\n");

    console.debug("\n--- Decoded JWT Payload ---");
    console.debug(JSON.stringify(payload, null, 2));
    console.debug("------------------------\n");

    return { payload, profile };
  } catch (error) {
    throw new Error(`Profile endpoint verification failed: ${error.message}`);
  }
}

/**
 * Demonstrates JWT verification using both methods
 * @param {string} token - The JWT access token to verify
 * @param {string} method - Verification method: 'jwks', 'profile', or 'both'
 * @returns {Promise<Object>} - Verification results
 */
export async function verifyJwtToken({ token, method = "both" }) {
  const results = {};

  if (method === "jwks" || method === "both") {
    console.info("🔐 Method 1: Verifying with JWK Set");
    results.jwksPayload = await verifyWithJWKSet(token);
  }

  if (method === "profile" || method === "both") {
    console.info("🔐 Method 2: Verifying with Profile Endpoint");
    const profileResult = await verifyWithProfileEndpoint(token);
    results.profilePayload = profileResult.payload;
    results.profileData = profileResult.profile;
  }

  return results;
}
