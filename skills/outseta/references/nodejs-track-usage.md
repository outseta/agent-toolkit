# Track Usage Demo

## Purpose

Demonstrates how to update usage-based pricing for add-on subscriptions.

## What it does

- Fetches account data with subscription and add-on information
- Validates that the specified add-on exists and is usage-based
- Creates a new usage record with the specified amount
- Provides detailed logging and error handling

## Use cases

- Tracking API calls, storage usage, or other metered services
- Implementing usage-based billing for custom add-ons
- Automating usage reporting from external systems

## 📋 Prerequisites

- The [global prerequisites](README.md#prerequisites)
- An account with a usage-based add-on subscription

## 📖 Learn More

For a comprehensive overview of usage-based pricing concepts, See Outseta's `Usage-based (metered) pricing guide` in the Knowledge Base

## API Endpoints Used

- `GET /api/v1/crm/accounts/{uid}?fields=Uid,Name,CurrentSubscription.*,CurrentSubscription.SubscriptionAddOns.*,CurrentSubscription.SubscriptionAddOns.AddOn.*` - Fetch account with subscription details
- `POST /api/v1/billing/usage` - Create usage record

## Core Code Examples

### Fetching Account Data

```javascript
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
```

### Validating Add-on Subscription

```javascript
// Find the correct add-on subscription
const addOnSubscriptions = accountData.CurrentSubscription.SubscriptionAddOns || [];
const targetAddOnSubscription = addOnSubscriptions.find(
  (subscriptionAddOn) => subscriptionAddOn.AddOn.Uid === addOnUid,
);

// Check if add-on exists and is usage-based (BillingAddOnType 2)
if (!targetAddOnSubscription) {
  throw new Error(`Subscription for add-on with UID ${addOnUid} not found`);
}

if (targetAddOnSubscription.AddOn.BillingAddOnType !== 2) {
  throw new Error(`Add-on with UID ${addOnUid} is not a usage add-on`);
}
```

### Creating Usage Record

```javascript
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
```
