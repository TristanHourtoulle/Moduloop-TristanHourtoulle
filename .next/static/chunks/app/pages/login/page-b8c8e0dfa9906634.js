(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[343],{53565:function(e,t,o){Promise.resolve().then(o.bind(o,23884))},23884:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return n}});var s=o(3827),l=o(56288);function n(){let e=async()=>{let e=document.getElementById("email"),t=document.getElementById("password"),o={id:0,firstName:"",name:"",email:e.value||"",password:t.value||"",role:"",createdAt:"",updatedAt:"",avatar:""};try{let e=o.email||"",t=o.password||"",s="/api/user?email=".concat(encodeURIComponent(e),"&password=").concat(encodeURIComponent(t)),n=await fetch(s,{method:"GET",headers:{"Content-Type":"application/json"}});n.ok?(l.toast.success("Connexion r\xe9ussie"),window.location.href="/"):alert("Error: "+n.statusText)}catch(e){}};return(0,s.jsxs)("div",{className:"w-[900px] h-[500px] bg-white flex shadow-lg items-center ml-auto mr-auto rounded-lg",children:[(0,s.jsxs)("div",{className:"flex flex-col gap-3 items-start justify-center bg-[#0A726F] w-[40%] h-full px-[4%] rounded-l-lg shadow-lg",children:[(0,s.jsxs)("h2",{className:"font-outfit font-bold text-white text-4xl",children:["Bon retour sur"," ",(0,s.jsx)("span",{className:"text-5xl text-[#30C1BD]",children:"Moduloop"})]}),(0,s.jsx)("hr",{className:"w-48 h-2 px-[4%] my-4 bg-[#30C1BD] border-0 rounded dark:bg-bg-[#30C1BD]"}),(0,s.jsx)("p",{className:"font-outfit text-white text-base opacity-[90%]",children:"Connectez-vous \xe0 votre compte pour continuer."})]}),(0,s.jsxs)("div",{className:"flex flex-col gap-10 items-center justify-center w-[60%] h-full",children:[(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,s.jsx)("h2",{className:"text-black font-outfit font-bold text-5xl",children:"Se connecter"}),(0,s.jsx)("p",{className:"mt-2 text-black font-outfit text-md",children:"Vous n'avez pas encore de compte ?"}),(0,s.jsx)("p",{onClick:()=>{window.location.href="/pages/register"},className:"cursor-pointer text-black font-outfit text-md font-bold transition-all hover:opacity-[75%]",children:"Cr\xe9er un compte"})]}),(0,s.jsxs)("div",{className:"w-full flex flex-col items-center gap-3",children:[(0,s.jsx)("input",{style:{width:"75%"},id:"email",type:"text",placeholder:"Addresse Mail",className:"text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "}),(0,s.jsx)("input",{style:{width:"75%"},id:"password",type:"password",placeholder:"Mot de passe",className:"text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "}),(0,s.jsx)("div",{onClick:e,className:"mt-3 bg-[#0A726F] px-8 py-4 rounded-lg text-white font-outfit text-lg w-[75%] text-center transition-all cursor-pointer hover:opacity-[75%]",children:"Connection"}),(0,s.jsx)("p",{onClick:()=>{alert("Fonctionnalit\xe9 encore en d\xe9veloppement")},className:"cursor-pointer transition-all hover:opacity-[75%] text-left text-[#0A726F] font-bold text-md",children:"Mot de passe oubli\xe9 ?"})]})]})]})}}},function(e){e.O(0,[288,971,69,744],function(){return e(e.s=53565)}),_N_E=e.O()}]);