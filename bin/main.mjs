import * as e from 'fs';
import r from 'path';
import t from 'appstore-connect-jwt-generator-core';
import o from 'arg';
import i from 'chalk-template';
import s from 'log4js';
s.configure(JSON.parse('{"appenders":{"out":{"layout":{"pattern":"%m%n","type":"pattern"},"type":"stdout"}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'));
let p = s.getLogger(), a = {
    '--help': {
        type: Boolean,
        alias: '-h'
    },
    '--version': {
        type: Boolean,
        alias: '-v'
    },
    '--cert': {
        type: String,
        alias: '-c'
    },
    '--keyId': {
        type: String,
        alias: '-k'
    },
    '--issuerId': {
        type: String,
        alias: '-i'
    }
}, n = Object.keys(a).map((e)=>{
    let r = JSON.parse("{}");
    return r[e] = a[e].type, r;
}).reduce((e, r)=>Object.assign(r, e)), l = Object.keys(a).map((e)=>{
    let r = JSON.parse("{}");
    return r[a[e].alias] = e, r;
}).reduce((e, r)=>Object.assign(r, e)), c = {
    ...n,
    ...l
};
try {
    let s = o(c), a = JSON.parse(Buffer.from(e.readFileSync(r.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), n = i`
  {bold USAGE}

      {dim $} {bold ${Object.keys(a.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== s['--help'] && (p.error(n), process.exit(0)), void 0 !== s['--version'] && (p.info(a.version), process.exit(0)), void 0 === s['--cert'] && (p.error('The certificate file path must be specified.'), process.exit(1)), void 0 === s['--keyId'] && (p.error('Key ID must be specified.'), process.exit(1)), void 0 === s['--issuerId'] && (p.error('Issuer ID must be specified.'), process.exit(1));
    let l = s['--cert'], d = e.readFileSync(l, JSON.parse('{"flag":"r"}')), f = t.tokenSync(d, s['--issuerId'], s['--keyId'], void 0);
    p.info(i`
{bold token}
${f}
`);
} catch (e) {
    p.error(e), process.exit(1);
}
