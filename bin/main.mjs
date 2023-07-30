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
}, n = Object.keys(a).map((p)=>{
    let n = JSON.parse("{}");
    return n[p] = a[p].type, n;
}).reduce((p, a)=>Object.assign(a, p)), l = Object.keys(a).map((p)=>{
    let n = JSON.parse("{}");
    return n[a[p].alias] = p, n;
}).reduce((p, a)=>Object.assign(a, p)), c = {
    ...n,
    ...l
};
try {
    let a = t(c), n = JSON.parse(Buffer.from(r.readFileSync(s.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), l = o`
  {bold USAGE}

      {dim $} {bold ${Object.keys(n.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== a['--help'] && (p.error(l), process.exit(0)), void 0 !== a['--version'] && (p.info(n.version), process.exit(0)), void 0 === a['--cert'] && (p.error('The certificate file path must be specified.'), process.exit(1)), void 0 === a['--keyId'] && (p.error('Key ID must be specified.'), process.exit(1)), void 0 === a['--issuerId'] && (p.error('Issuer ID must be specified.'), process.exit(1));
    let d = a['--cert'], f = r.readFileSync(d, JSON.parse('{"flag":"r"}')), u = e.tokenSync(f, a['--issuerId'], a['--keyId'], void 0);
    p.info(o`
{bold token}
${u}
`);
} catch (a) {
    p.error(a), process.exit(1);
}
