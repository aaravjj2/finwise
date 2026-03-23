import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { config as loadEnv } from 'dotenv'

loadEnv({ path: join(process.cwd(), '.env.local') })

const supabase = createClient(
  (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function importInstitutions() {
  const dir = join(process.cwd(), 'data/institutions')
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'))

  for (const file of files) {
    const institutions = JSON.parse(readFileSync(join(dir, file), 'utf-8'))
    const rows = institutions.map((inst: Record<string, unknown>) => ({
      name: inst.name,
      type: inst.type || 'microfinance',
      country_code: inst.country_code,
      website: inst.website || null,
      phone: null,
      interest_rate_min: inst.apr_min,
      interest_rate_max: inst.apr_max,
      accepts_first_time_borrowers: inst.accepts_first_timers ?? true,
      requires_collateral: inst.requires_collateral ?? false,
      description: inst.description || null,
      logo_url: null,
      verified: inst.verified ?? true,
    }))

    const countryCode = rows[0]?.country_code as string | undefined
    if (!countryCode) {
      console.error(`Error importing ${file}: missing country_code`)
      continue
    }

    const { error: deleteError } = await supabase
      .from('institutions')
      .delete()
      .eq('country_code', countryCode)

    if (deleteError) {
      console.error(`Error clearing ${countryCode} before import:`, deleteError)
      continue
    }

    const { error } = await supabase
      .from('institutions')
      .insert(rows)

    if (error) console.error(`Error importing ${file}:`, error)
    else console.log(`✓ Imported ${rows.length} from ${file}`)
  }
}

importInstitutions()
