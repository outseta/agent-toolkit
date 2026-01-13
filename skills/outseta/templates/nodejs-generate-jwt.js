import "dotenv/config";

/**
 * Logs in a user and retrieves a JWT access token
 * @param {{ email: string }} params - Object containing the user's email
 * @returns {Promise<Object>} - The API response (token, etc)
 */
async function loginUser({ email }) {
  try {
    const payload = {
      username: email,
    };

    const response = await fetch(
      `https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/api/v1/tokens`,
      {
        method: "POST",
        headers: {
          Authorization: `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    console.debug("--- api/v1/tokens response ---");
    console.debug(JSON.stringify(data, null, 2));
    console.debug("------------------------------");

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.status} - ${data.ErrorMessage || data.Message}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export { loginUser };
