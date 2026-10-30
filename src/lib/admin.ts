import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
export async function requireAdmin() {
 const supabase=await supabaseServer(); const {data:{user}}=await supabase.auth.getUser();
 const allowed=(process.env.ADMIN_EMAILS||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
 if(!user || (allowed.length && (!user.email || !allowed.includes(user.email.toLowerCase())))) redirect("/admin/login");
 return {supabase,user};
}
