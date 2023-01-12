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
    let i = t(c), a = JSON.parse(Buffer.from(r.readFileSync(s.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), n = o`
  {bold USAGE}

      {dim $} {bold ${Object.keys(a.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== i['--help'] && (p.error(n), process.exit(0)), void 0 !== i['--version'] && (p.info(a.version), process.exit(0)), void 0 === i['--cert'] && (p.error('The certificate file path must be specified.'), process.exit(1)), void 0 === i['--keyId'] && (p.error('Key ID must be specified.'), process.exit(1)), void 0 === i['--issuerId'] && (p.error('Issuer ID must be specified.'), process.exit(1));
    let l = i['--cert'], d = r.readFileSync(l, JSON.parse('{"flag":"r"}')), f = e.tokenSync(d, i['--issuerId'], i['--keyId'], void 0);
    p.info(o`
{bold token}
${f}
`);
} catch (e) {
    p.error(e), process.exit(1);
}
