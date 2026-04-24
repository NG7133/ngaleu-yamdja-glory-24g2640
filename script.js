let DB = JSON.parse(localStorage.getItem("agro")) || [];

/* 🔐 LOGIN */
function login(){
let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(!u || !p){
alert("Remplis tout");
return;
}

localStorage.setItem("user",u);
document.getElementById("loginPage").style.display="none";
document.getElementById("app").style.display="flex";

document.getElementById("userDisplay").innerText="👤 "+u;
}

if(localStorage.getItem("user")){
document.getElementById("loginPage").style.display="none";
}

/* NAV */
function goPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById("page-"+id).classList.add("active");
}

/* SAVE */
function save(){
localStorage.setItem("agro",JSON.stringify(DB));
document.getElementById("topbar-cnt").innerText=DB.length+" collectes";
}

/* FORM */
function submitForm(){

let data={
nom:f("f-nom"),
region:f("f-region"),
culture:f("f-culture"),
rendement:Number(f("f-rendement"))
};

if(!data.nom || !data.culture){
alert("champs manquants");
return;
}

DB.push(data);
save();
}

/* GET */
function f(id){
return document.getElementById(id).value;
}

/* DASHBOARD */
function buildDashboard(){

new Chart(document.getElementById("chart-bar"),{
type:"bar",
data:{
labels:DB.map(e=>e.culture),
datasets:[{data:DB.map(e=>e.rendement)}]
}
});

let c={};
DB.forEach(e=>{
c[e.culture]=(c[e.culture]||0)+1;
});

new Chart(document.getElementById("chart-donut"),{
type:"doughnut",
data:{
labels:Object.keys(c),
datasets:[{data:Object.values(c)}]
}
});

alerts();
}

/* ALERTES */
function alerts(){
let div=document.getElementById("alerts");
div.innerHTML="";

DB.forEach(e=>{
if(e.rendement<800){
div.innerHTML+="⚠️ "+e.nom+" rendement faible<br>";
}
});
}

/* IA PRO (simple locale) */
function sendMsg(){

let t=document.getElementById("ai-input").value;
if(!t) return;

let chat=document.getElementById("chat");

chat.innerHTML+="<p><b>Toi:</b> "+t+"</p>";

let rep="Analyse agricole: optimise irrigation et engrais.";

if(t.toLowerCase().includes("maïs")) rep="Maïs: utiliser NPK + pluie régulière";
if(t.toLowerCase().includes("riz")) rep="Riz: besoin d'eau constante";
if(t.toLowerCase().includes("sol")) rep="Améliorer avec compost";

chat.innerHTML+="<p><b>IA:</b> "+rep+"</p>";

document.getElementById("ai-input").value="";
}

/* EXPORT */
function exportData(){
let blob=new Blob([JSON.stringify(DB)],{type:"application/json"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="agro.json";
a.click();
}

/* RESET */
function clearAll(){
DB=[];
save();
alert("reset ok");
}

/* INIT */
save();
