const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const js=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
new vm.Script(js);
const setup=js.slice(js.indexOf('const KEY='),js.indexOf("try{const s=JSON.parse"));
const calculation=js.slice(js.indexOf('function calculate('),js.indexOf('function persist('));
const context=vm.createContext({document:{},console});
vm.runInContext(setup+'\n'+calculation+'\nglobalThis.api={fresh,calculate,validSaved,EXAMPLES,BENCH};',context);
const {fresh,calculate,validSaved,EXAMPLES,BENCH}=context.api;
let checks=0;function equal(actual,expected){assert.ok(Math.abs(actual-expected)<1e-7,`${actual} != ${expected}`);checks++;}
let s=fresh();equal(calculate(s).total,56160);
s.values=Array(9).fill(0);equal(calculate(s).total,0);
s.tenure='rent';s.housing=500*52;equal(calculate(s).total,26000);
s.values=[12000,1200,6000,2400,3600,10000,1200,1200,3600];s.car=35000;s.caryears=7;s.other=2000;s.buffer=10;
// Independently: categories = 41,200; rent = 26,000; reserve = 5,000; other = 2,000;
// buffer excludes 10,000 travel: 10% of (31,200 + 26,000) = 5,720.
equal(calculate(s).base,41200);equal(calculate(s).buffer,5720);equal(calculate(s).total,79920);
s.tenure='own';equal(calculate(s).housing,0);equal(calculate(s).total,51320);
s.buffer=0;s.car=0;s.other=0;equal(calculate(s).total,41200);
for(const f of [1,12,26,52]){s=fresh();s.values=Array(9).fill(0);s.values[0]=100*f;equal(calculate(s).total,100*f);}
s=fresh();s.household='couple';s.values=EXAMPLES.couple.comfortable.map(v=>v*12);equal(calculate(s).total,78996);
equal(BENCH.single.modest,36548);equal(BENCH.single.comfortable,56166);equal(BENCH.couple.comfortable,78998);equal(BENCH.single.rent,51418);
assert.ok(validSaved(fresh()));checks++;
s=fresh();s.caryears=0;assert.ok(!validSaved(s));checks++;
s=fresh();s.values[2]=-1;assert.ok(!validSaved(s));checks++;
s=fresh();s.inflation=Infinity;assert.ok(!validSaved(s));checks++;
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]).filter(x=>!x.includes('${'));assert.equal(ids.length,new Set(ids).size);checks++;
assert.ok(html.includes('prefers-reduced-motion'));assert.ok(html.includes('@media print'));assert.ok(!/<script[^>]+src=["']https?:/.test(html));checks+=3;
s=fresh();s.goalAmount=12000;s.goalYears=4;s.goalTiming='now';equal(calculate(s).total,56160);equal(calculate(s).experience,0);
s.goalTiming='later';equal(calculate(s).total,59160);equal(calculate(s).experience,3000);
s.buffer=10;equal(calculate(s).buffer,5197.2);equal(calculate(s).total,64357.2);
s.goalAmount=0;equal(calculate(s).total,61357.2);
const source=fs.readFileSync(__dirname+'/source/horizon.js','utf8');assert.ok(source.includes('WebGLRenderer'));assert.ok(source.includes('prefers-reduced-motion'));assert.ok(source.includes('webglcontextlost'));assert.ok(source.includes('IntersectionObserver'));checks+=4;
console.log(`${checks} checks passed: source syntax, zero budget, rent, mortgage/owner exclusion, purchase reserves, buffer exclusions, frequency conversions, presets, benchmarks, saved-data validation, IDs and accessibility hooks.`);
