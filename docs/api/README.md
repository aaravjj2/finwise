# FinWise B2B API (v1)

Base URL: `https://finwise-azure.vercel.app/api/v1`

All endpoints require:

- Header: `Authorization: Bearer fw_live_...`
- JSON responses in envelope:
  - Success: `{ "success": true, "data": ... }`
  - Error: `{ "success": false, "error": "..." }`

## POST /assess

Assess literacy and recommend modules.

Request body:

```json
{
  "phone": "+2348012345678"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "literacy_score": 62,
    "level": 4,
    "recommended_modules": ["smart-borrowing", "remittance", "business"]
  }
}
```

Example:

```bash
curl -X POST "https://finwise-azure.vercel.app/api/v1/assess" \
  -H "Authorization: Bearer fw_live_xxx" \
  -H "Content-Type: application/json" \
  -d '{"phone":"+2348012345678"}'
```

## GET /score/:phone

Get current literacy score and completed modules for a learner.

Example:

```bash
curl "https://finwise-azure.vercel.app/api/v1/score/%2B2348012345678" \
  -H "Authorization: Bearer fw_live_xxx"
```

Response:

```json
{
  "success": true,
  "data": {
    "phone": "+2348012345678",
    "literacy_score": 62,
    "completed_modules": ["savings-basics", "smart-borrowing"],
    "last_active": "2026-03-23T22:00:00.000Z"
  }
}
```

## POST /assign

Assign modules to a learner.

Request body:

```json
{
  "phone": "+2348012345678",
  "modules": ["savings-basics", "protection"]
}
```

Response:

```json
{
  "success": true,
  "data": {
    "assigned": ["savings-basics", "protection"],
    "notification_sent": true
  }
}
```

## GET /progress/:phone

Get completed and pending modules.

Example:

```bash
curl "https://finwise-azure.vercel.app/api/v1/progress/%2B2348012345678" \
  -H "Authorization: Bearer fw_live_xxx"
```

Response:

```json
{
  "success": true,
  "data": {
    "completed": ["savings-basics", "smart-borrowing", "protection"],
    "pending": ["remittance", "business", "future"],
    "score": 72
  }
}
```

## Error Codes

- `400` invalid request body or path parameter
- `401` missing/invalid API key
- `500` backend API key store misconfiguration
