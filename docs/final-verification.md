# Final Verification Checklist

## Completed checks

- `npm run check-types`
- `npm run lint`
- `npm test -- --run`
- `npm run test:e2e`
- `npm run audit:all`

## Notes

- Lighthouse assertions currently emit warnings on login-route accessibility/performance for redirected variants.
- Axe audit currently reports non-blocking findings (`landmark-one-main`, `meta-viewport`, `region`) and fails only on serious/critical findings.
- Crawler runtime still requires a reachable Lightpanda CDP endpoint (`LIGHTPANDA_CDP_URL`).

## Manual smoke paths

- `/en/login` -> continue without account -> `/en/chat`
- `/en/learn` module list and lesson navigation
- `/en/resources` cards and institution list
- `/en/circles` create/join flow entry points
