# Outseta REST API Documentation

The Outseta REST API enables customers to perform a variety of powerful tasks such as creating and updating people, accounts, subscriptions and invoices. Outseta uses standard HTTP protocols within a compliant architecture that is simple to integrate. You can use the API both on the client or the server side; see instructions for authorization for each scenario in the getting started section.

The easiest way to get started with the API is to click the **Run in Postman** button present at the top of the documentation page and use the Postman App to send requests. Make sure to update the **Outseta** environment information at the top right corner of Postman so that it can be applied automatically when you send requests.

## Getting Started

You need to include a valid authorization token to send requests to the API endpoints.

### Server Side

To construct the authorization token you need to create an API key under Settings >> Integrations >> API Keys. Make sure to record the secret key when you create the new API Key. Then construct the token as follows:

"Outseta \[APIKey\]:\[SecretKey\]"

**Example:**

Outseta ce08fd5a-e1ee-4472-9c5f-b7575d8369b2:74fc1d2242a4eb7336d34b0e40cfbc5f

### Client Side

If you plan to use the API from the client side do NOT use the API keys as those are unsecure on the client side and can be easily copied. Instead construct the authorization token by calling the Get Auth API from the server side with your Outseta username and password. Then construct the authorization token as follows:

"bearer \[access_token\]"

**Example:**

bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InhObnZiLWxaWDJWNHdKTFctaVdreXBSR0cwVSJ9.eyJ1bmlxdWVfbmFtZSI6ImRpbWl0cmlzQG91dHNldGEuY29tIiwiZ2l2ZW5fbmFtZSI6IkRpbWl0cmlzIiwiZmFtaWx5X25hbWUiOiJHZW9yZ2Frb3BvdWxvcyIsImVtYWlsIjoiZGltaXRyaXNAb3V0c2V0YS5jb20iLCJuYW1laWQiOiI0WFFZcVFQQiIsIm91dHNldGE6YWNjb3VudFVpZCI6IndabU5abTJPIiwib3V0c2V0YTphY2NvdW50Q2xpZW50SWRlbnRpZmllciI6IjEiLCJ

## API Guidelines

1. For the URL use your outseta domain name and append /api/v1 https://\[yourdomain\].outseta.com/api/v1
2. The API will only respond to secured communication done over HTTPS. HTTP requests will be sent a 301 redirect to corresponding HTTPS resources.
3. Response to every request is sent in JSON format. In case the API request results in an error, it is represented by an "error": {} key in the JSON response.
4. The request method (verb) determines the nature of action you intend to perform. A request made using the GET method implies that you want to fetch something from Outseta, and POST implies you want to save something new to Outseta.
5. The API calls will respond with appropriate HTTP status codes for all requests. A 200 OK indicates all went well, while 4XX or 5XX response codes indicate an error from the requesting client or our API servers respectively.
6. Use "donotlog=1" as part of the querystring on any API call where you don't want to trigger the action performed being logged in the activity log.

## Get all API conventions

You can apply filtering by adding additional information on the querystring on the methods that retrieve all the entities in a domain (e.g., Get all accounts, Get all people). The conventions are as follows:

### Field Selection

When you make an API request, you'll automatically get all the basic information from the main object and its immediate child objects. Think of it as getting the "standard package" of data.

Change this behaviour by using the `fields` query param:

- **Go deeper**: Want information that's nested further down? The `fields` param lets you request fields lower down in the object tree: `?fields=CurrentSubscription.Plan.*`
- **Go lighter**: Want just the essentials for faster performance? The `fields` param lets you request only the root-level information: `?fields=Uid,Name`

Or do a combination: `?fields=Uid,Name,CurrentSubscription.Plan.Uid`

**Wildcard**: Use `*` to get all fields in an object: `?fields=*` or `?fields=CurrentSubscription.Plan.*`

#### Examples

```
<!-- Get the current subscription plan uid   -->
GET https://[your-domain].outseta.com/api/v1/crm/accounts/[uid-of-an-account]?fields=CurrentSubscription.Plan.Uid

<!-- Get the account UID and the plan UID for a list of accounts -->
GET https://[your-domain].outseta.com/api/v1/crm/accounts?fields=Uid,CurrentSubscription.Plan.Uid

<!-- Get the full plan object for an account's current subscription -->
GET https://[your-domain].outseta.com/api/v1/crm/accounts/[uid-of-an-account]?fields=CurrentSubscription.Plan.*

<!-- Get the account UID and the plan UID for a person's current subscription(s) -->
GET https://[your-domain].outseta.com/api/v1/crm/people/[uid-of-a-person]?fields=Uid,PersonAccount.Account.CurrentSubscription.Plan.Uid
```

### Pagination

```
offset=defines which page to start
limit=number of records to return for each page
?offset=0&limit=20 (returns results 1-20)
?offset=1&limit=20 (returns results 21-40)

```

If your request includes fields from a child object you will be limited to retrieving 25 items in a single request. The maximum number of results returned in requests not requesting child object fields is 100 items.

### Sorting

```
Sorts the resultset based on the property and sort clause defined
?orderBy=PropertyName+DESC

```

### Filtering

Filter your data using query parameters to find specific records. You can use exact matches or comparison operators for more advanced filtering scenarios.

#### Basic Filtering

Filter on any field using the field as the query parameters: `?Email=john@example.com`

#### Comparison Operators

For advanced filtering, append comparison operators to field names:

| Operator   | Description           | Example                          |
| ---------- | --------------------- | -------------------------------- |
| `__gt`     | Greater than          | `Created__gt=2024-01-01`         |
| `__gte`    | Greater than or equal | `Amount__gte=100`                |
| `__lt`     | Less than             | `Created__lt=2024-12-31`         |
| `__lte`    | Less than or equal    | `Amount__lte=500`                |
| `__ne`     | Not equal             | `Status__ne=Active`              |
| `__isnull` | Is null (true/false)  | `ProfileImageS3Url__isnull=true` |

#### Examples

```
<!-- Date Filtering   -->
GET https://[your-domain].outseta.com/api/v1/crm/accounts?Created__gt=2024-01-01
GET https://[your-domain].outseta.com/api/v1/billing/subscriptions?EndDate__lt=2024-08-01

<!-- Numeric Filtering   -->
GET https://[your-domain].outseta.com/api/v1/billing/invoices?Amount__gte=1000
GET https://[your-domain].outseta.com/api/v1/billing/plans?MonthlyRate__lt=50

<!-- Status Filtering   -->
GET https://[your-domain].outseta.com/api/v1/crm/accounts?AccountStageLabel__ne=Cancelled

<!-- Null Value Filtering   -->
GET https://[your-domain].outseta.com/api/v1/crm/people?ProfileImageS3Url__isnull=true
GET https://[your-domain].outseta.com/api/v1/crm/accounts?ClientIdentifier__isnull=false

<!-- Multiple Filters   -->
GET https://[your-domain].outseta.com/api/v1/billing/subscriptions?
  StartDate__gte=2024-01-01&
  Rate__lt=100&
  DiscountCode__isnull=false

<!-- Complex Example with Field Selection   -->
GET https://[your-domain].outseta.com/api/v1/billing/subscriptions?
  Rate__gte=500&
  DiscountCode__isnull=false&
  fields=Uid,Amount,StartDate,DiscountCode,Plan.Name
```

## Acceptable use

Requests authorized by an API Key should not exceed 4 requests/second.

## Support

For help regarding the Outseta API please email [support@outseta.com](https://mailto:support@outseta.com)
