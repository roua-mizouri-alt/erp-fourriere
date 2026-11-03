const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'fourriere-state.json');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const PORT = Number(process.env.PORT || 8787);
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });
const initial = { vehicles: [], tariffs: {
  voiture:{label:'Voiture',remorquage:50,gardiennage:15}, moto:{label:'Moto',remorquage:30,gardiennage:8}, camion:{label:'Camion',remorquage:100,gardiennage:30}, camionette:{label:'Camionnette',remorquage:70,gardiennage:22}, autre:{label:'Autre',remorquage:60,gardiennage:18}
}, logs:[], invoiceNo:1000 };
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
function readState(){ const x=JSON.parse(fs.readFileSync(DB_FILE,'utf8')); if(!x || !Array.isArray(x.vehicles) || !x.tariffs) throw new Error('Invalid database'); return x; }
function send(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(obj));}
function localIPs(){const out=[];for(const list of Object.values(os.networkInterfaces()))for(const n of list||[])if(n.family==='IPv4'&&!n.internal)out.push(n.address);return out;}
function backupOncePerDay(){
  if(!fs.existsSync(DB_FILE)) return;
  const day=new Date().toISOString().slice(0,10);
  const target=path.join(BACKUP_DIR,`fourriere-${day}.json`);
  if(!fs.existsSync(target)) fs.copyFileSync(DB_FILE,target);
  const files=fs.readdirSync(BACKUP_DIR).filter(x=>/^fourriere-\d{4}-\d{2}-\d{2}\.json$/.test(x)).sort();
  while(files.length>30){const old=files.shift();fs.unlinkSync(path.join(BACKUP_DIR,old));}
}
let writeQueue=Promise.resolve();
const server=http.createServer((req,res)=>{
  if(req.url==='/health' && req.method==='GET') return send(res,200,{ok:true,service:'Fourrière Manager LAN',database:fs.existsSync(DB_FILE)});
  if(req.url==='/api/state' && req.method==='GET'){
    try{return send(res,200,{ok:true,state:readState()});}catch(e){return send(res,500,{ok:false,error:'تعذّرت قراءة قاعدة البيانات؛ أوقف الخادم وراجع النسخة الاحتياطية'});}
  }
  if(req.url==='/api/state' && req.method==='POST'){
    let body='',tooLarge=false;
    req.on('data',chunk=>{body+=chunk;if(body.length>25*1024*1024){tooLarge=true;res.destroy();}});
    req.on('end',()=>{
      if(tooLarge)return;
      let next;
      try{next=JSON.parse(body);}catch(e){return send(res,400,{ok:false,error:'JSON غير صالح'});}
      if(!next||!Array.isArray(next.vehicles)||!next.tariffs||typeof next.tariffs!=='object'||!Array.isArray(next.logs||[]))return send(res,400,{ok:false,error:'بنية قاعدة البيانات غير صحيحة'});
      writeQueue=writeQueue.then(()=>{
        backupOncePerDay();
        const tmp=DB_FILE+'.tmp';
        fs.writeFileSync(tmp,JSON.stringify(next,null,2),'utf8');
        fs.renameSync(tmp,DB_FILE);
        send(res,200,{ok:true,savedAt:new Date().toISOString()});
      }).catch(e=>send(res,500,{ok:false,error:'فشل حفظ قاعدة البيانات'}));
    });return;
  }
  if(req.method==='GET' && (req.url==='/'||req.url==='/index.html')){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    return fs.createReadStream(path.join(PUBLIC,'index.html')).pipe(res);
  }
  send(res,404,{ok:false,error:'Not found'});
});
server.listen(PORT,'0.0.0.0',()=>{console.log('\nFourrière Manager — serveur local LAN');console.log('Sur ce PC : http://localhost:'+PORT);for(const ip of localIPs())console.log('Autres PC : http://'+ip+':'+PORT);console.log('Sauvegardes quotidiennes : data\\backups (30 jours)');console.log('\nGardez cette fenêtre ouverte pendant le travail.');});
