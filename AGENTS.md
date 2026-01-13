# Outseta Integration

- **Authentication**: Outseta is the primary source of truth for user identity. Use the Outseta "Magic Script" and embed widgets for login, sign-up, and profile management.
- **Subscriptions**: Billing and subscription plans are managed in Outseta. Access to features should be gated based on the user's subscription status retrieved from Outseta JWT claims or the REST API.
- **Data Sync**: Use Outseta UIDs as foreign keys in the local database (Convex). Sync data using webhooks (Activity Notifications).
- **REST API**: For advanced use cases, interact with Outseta's REST API for server-to-server communication, custom onboarding flows, or administrative tasks, authorization and content protection.

ALWAYS Look in the `outseta` SKILL for details first before implementing new code that integrates with Outseta.
The skill also contains templates for things suchs as signup and login embeds and popup dialogs, lead capture forms, and email list subscription forms, and how to integrate with the backend using webhooks, JWT and the REST API.
