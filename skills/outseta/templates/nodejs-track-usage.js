import "dotenv/config";

/**
 * Updates usage for a specific add-on subscription in Outseta
 * @param {string} accountUid - The unique identifier for the account
 * @param {string} addOnUid - The unique identifier for the add-on
 * @param {number} amount - The usage amount to add
 * @returns {Promise<Object>} - The API response
 */
export async function updateUsageBasedPricing(accountUid, addOnUid, amount) {
  // Step 1: Fetch the account with subscription add-on info
  const accountResponse = await fetch(
    `https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/api/v1/crm/accounts/${accountUid}?fields=Uid,Name,CurrentSubscription.*,CurrentSubscription.SubscriptionAddOns.*,CurrentSubscription.SubscriptionAddOns.AddOn.*`,
    {
      method: "GET",
      headers: {
        Authorization: `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`,
        "Content-Type": "application/json",
      },
    },
  );

  const accountData = await accountResponse.json();
  if (!accountResponse.ok) {
    throw new Error(
      `/api/v1/crm/accounts/: [${accountResponse.status}] ${
        accountData.ErrorMessage || accountData.Message || ""
      }`,
    );
  }

  console.debug(`✅ Account data fetched for: ${accountUid}`);

  // Step 2: Find the correct add-on subscription
  const addOnSubscriptions = accountData.CurrentSubscription.SubscriptionAddOns || [];
  const targetAddOnSubscription = addOnSubscriptions.find((subscriptionAddOn) => {
    return subscriptionAddOn.AddOn.Uid === addOnUid;
  });

  // Check if the add-on is found
  if (!targetAddOnSubscription) {
    throw new Error(
      `Subscription for add-on with UID ${addOnUid} not found for account ${accountUid}`,
    );
  }

  // Check if the add-on is a usage add-on (BillingAddOnType 2)
  if (targetAddOnSubscription.AddOn.BillingAddOnType !== 2) {
    throw new Error(`Add-on with UID ${addOnUid} is not a usage add-on for account ${accountUid}`);
  }

  console.debug(`✅ Found add-on subscription: ${targetAddOnSubscription.Uid}`);

  // Step 3: Update usage for the add-on subscription
  const usageUpdatePayload = {
    UsageDate: new Date().toISOString(),
    Amount: amount,
    SubscriptionAddOn: {
      Uid: targetAddOnSubscription.Uid,
    },
  };

  const usageResponse = await fetch(
    `https://${process.env.OUTSETA_SUBDOMAIN}.outseta.com/api/v1/billing/usage`,
    {
      method: "POST",
      headers: {
        Authorization: `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usageUpdatePayload),
    },
  );

  const usageData = await usageResponse.json();
  console.debug("\n--- api/v1/billing/usage response ---");
  console.debug(JSON.stringify(usageData, null, 2));
  console.debug("------------------------------\n");

  if (!usageResponse.ok) {
    throw new Error(
      `/api/v1/billing/usage: [${usageResponse.status}] ${
        usageData.ErrorMessage || usageData.Message || ""
      }`,
    );
  }

  return usageData;
}
