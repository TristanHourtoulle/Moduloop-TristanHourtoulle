"use strict";(()=>{var e={};e.id=8,e.ids=[8],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35900:e=>{e.exports=require("pg")},69460:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>E,originalPathname:()=>h,patchFetch:()=>m,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>c,staticGenerationAsyncStorage:()=>l,staticGenerationBailout:()=>R});var s={};r.r(s),r.d(s,{GET:()=>n});var o=r(95419),u=r(69108),a=r(99678),i=r(7727);async function n(e){try{let e=await i.Z.query('SELECT * FROM users ORDER BY "updatedAt" DESC;');if(0===e.rowCount)throw Error("Aucun utilisateur trouv\xe9 dans la base de donn\xe9es");return Response.json({success:!0,data:e.rows},{status:200})}catch(e){return Response.json({success:!0,error:e},{status:500})}}let p=new o.AppRouteRouteModule({definition:{kind:u.x.APP_ROUTE,page:"/api/user/list/route",pathname:"/api/user/list",filename:"route",bundlePath:"app/api/user/list/route"},resolvedPagePath:"C:\\Users\\trist\\Moduloop\\Moduloop-TristanHourtoulle\\app\\api\\user\\list\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:c,headerHooks:E,staticGenerationBailout:R}=p,h="/api/user/list/route";function m(){return(0,a.patchFetch)({serverHooks:c,staticGenerationAsyncStorage:l})}},7727:(e,t,r)=>{r.d(t,{Z:()=>u});let{Pool:s}=r(35900),o=new s({host:"localhost",user:"postgres",password:"root",database:"Moduloop"});o.query(`
    CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
`,(e,t)=>{e&&console.error(e)});let u=o},95419:(e,t,r)=>{e.exports=r(30517)}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638],()=>r(69460));module.exports=s})();