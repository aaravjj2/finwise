# FinWise Data

Community-maintained data repository for financial institutions in emerging markets.

## Structure

- `schema.json`: JSON schema for institution records
- `countries/<ISO2>.json`: country-level data files
- `.github/workflows/validate.yml`: validates schema on pull requests

## Record fields

Each institution entry must include:

- `name`
- `type` (`microfinance`, `bank`, `mobile_money`, `ngo`, `government`)
- `country_code`
- `website`
- `interest_rate_min`
- `interest_rate_max`
- `accepts_first_time_borrowers`
- `requires_collateral`
- `description`

## Contribution flow

1. Edit a country JSON file.
2. Keep values realistic and sourced.
3. Open a pull request.
4. CI validates schema before merge.
