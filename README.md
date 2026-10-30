# Crafted By SJ

Dark editorial personal portfolio and resource hub.

## Install
Requires Node.js 20.9+.

```powershell
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000.

## Hero portrait
Copy your existing `hero-portrait.png` into `public/images/hero-portrait.png`. The hero CSS references that path and falls back to the dark background if the image is missing.

## Supabase admin setup
1. Create a Supabase project.
2. Copy Project URL and anon/public key into `.env.local`.
3. In Supabase SQL Editor, run `supabase/schema.sql`.
4. Create your admin user in Supabase Authentication → Users.
5. Set `ADMIN_EMAILS` to your exact login email.
6. Restart the dev server after editing `.env.local`.

The admin area supports Supabase email/password login and CRUD for resource records. This baseline does not yet include file-upload UI, project management, or full gallery/about CMS screens; those should be added in a later iteration rather than treated as implemented.

## Deploy
Import the GitHub repository into Vercel and add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `ADMIN_EMAILS`. Configure Supabase Auth Site URL and redirect URLs to your production domain.

## Verify
Run `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` locally after dependency installation. These checks have not been executed in the generation environment.

## Content
Starter resources are examples without download URLs. Add only verified links before publishing. Replace generic Instagram and LinkedIn links with your actual profiles. No client work or personal achievements have been invented.
