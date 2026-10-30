import { createServerClient } from "@supabase/ssr";
import { NextResponse,type NextRequest } from "next/server";
export async function middleware(req:NextRequest){
 let res=NextResponse.next({request:req}); const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key||req.nextUrl.pathname==="/admin/login") return res;
 const sb=createServerClient(url,key,{cookies:{getAll:()=>req.cookies.getAll(),setAll(items){items.forEach(({name,value})=>req.cookies.set(name,value));res=NextResponse.next({request:req});items.forEach(({name,value,options})=>res.cookies.set(name,value,options));}}});
 if(req.nextUrl.pathname.startsWith("/admin")){const {data:{user}}=await sb.auth.getUser();if(!user)return NextResponse.redirect(new URL("/admin/login",req.url));}
 return res;
}
export const config={matcher:["/admin/:path*"]};
