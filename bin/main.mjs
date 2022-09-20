import e from 'appstore-connect-jwt-generator-core';
import * as r from 'fs';
import t from 'arg';
import o from 'chalk-template';
import i from 'log4js';
import s from 'path';
i.configure(JSON.parse('{"appenders":{"out":{"layout":{"pattern":"%m%n","type":"pattern"},"type":"stdout"}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'));
let p = i.getLogger(), a = {
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
    let d = t(c), f = JSON.parse(Buffer.from(r.readFileSync(s.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), u = o`
  {bold USAGE}

      {dim $} {bold ${Object.keys(f.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== d['--help'] && (p.error(u), process.exit(0)), void 0 !== d['--version'] && (p.info(f.version), process.exit(0)), void 0 === d['--cert'] && (p.error('The certificate file path must be specified.'), process.exit(1)), void 0 === d['--keyId'] && (p.error('Key ID must be specified.'), process.exit(1)), void 0 === d['--issuerId'] && (p.error('Issuer ID must be specified.'), process.exit(1));
    let m = d['--cert'], y = r.readFileSync(m, JSON.parse('{"flag":"r"}')), g = e.tokenSync(y, d['--issuerId'], d['--keyId'], void 0);
    p.info(o`
{bold token}
${g}
`);
} catch (I) {
    p.error(I), process.exit(1);
}
