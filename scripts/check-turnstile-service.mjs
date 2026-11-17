// Official public dummy secrets only. Creates no Cloudflare resources.
import fs from 'node:fs';
const results=[];
for(const [label,prefix,expected] of [['pass','1x',true],['fail','2x',false],['reused','3x',false]]) {
  const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:prefix+'0000000000000000000000000000000AA',response:'XXXX.DUMMY.TOKEN.XXXX'}),signal:AbortSignal.timeout(15000)});
  const body=await response.json();results.push({label,httpStatus:response.status,success:body.success,hostname:body.hostname,errors:body['error-codes']});
  if(body.success!==expected)throw new Error('Unexpected dummy-key response: '+label);
}
fs.writeFileSync('docs/review/2026-11-17/turnstile-service.json',JSON.stringify({checkedAt:new Date().toISOString(),source:'https://developers.cloudflare.com/turnstile/troubleshooting/testing/',note:'Official dummy keys test network and provider pass/fail/reused responses. Dummy success uses example.com and has no action; production hostname/action checks are tested separately with controlled responses, and must be smoke-tested after authorized activation.',results},null,2)+'\n');console.log(JSON.stringify(results,null,2));
