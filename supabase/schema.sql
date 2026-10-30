create extension if not exists pgcrypto;
create table if not exists public.resources(id uuid primary key default gen_random_uuid(),slug text unique not null,title text not null,category text not null default 'RESOURCE',description text not null default '',software text not null default '',kind text not null default 'external' check(kind in('external','download')),url text not null default '',published boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.resources enable row level security;
drop policy if exists "Public reads published resources" on public.resources;
create policy "Public reads published resources" on public.resources for select using(published=true);
drop policy if exists "Authenticated admins manage resources" on public.resources;
create policy "Authenticated admins manage resources" on public.resources for all to authenticated using(true) with check(true);
