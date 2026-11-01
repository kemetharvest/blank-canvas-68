import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'repo-importer-84hgrtk2',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_we5O4OnxcPN4VjI5r5BSXzy7UHjnWlf8',
  authRequired: false,
  auth: { mode: 'managed' },
})
