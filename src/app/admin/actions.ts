"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {requireAdmin} from "@/lib/admin";
import {supabaseServer} from "@/lib/supabase/server";
export async function signOut(){const sb=await supabaseServer();await sb.auth.signOut();redirect("/admin/login");}
export async function saveResource(form:FormData){const {supabase}=await requireAdmin();const item={slug:String(form.get("slug")||"").trim(),title:String(form.get("title")||"").trim(),category:String(form.get("category")||"RESOURCE").trim(),description:String(form.get("description")||"").trim(),software:String(form.get("software")||"").trim(),kind:String(form.get("kind")||"external"),url:String(form.get("url")||"").trim(),published:form.get("published")==="on"};if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)||!item.title)throw new Error("Enter a title and URL-safe slug.");const {error}=await supabase.from("resources").upsert(item,{onConflict:"slug"});if(error)throw new Error(error.message);revalidatePath("/");revalidatePath("/admin");}
export async function removeResource(form:FormData){const {supabase}=await requireAdmin();const {error}=await supabase.from("resources").delete().eq("id",String(form.get("id")));if(error)throw new Error(error.message);revalidatePath("/admin");revalidatePath("/");}
