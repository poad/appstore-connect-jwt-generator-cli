import e from 'appstore-connect-jwt-generator-core';
import * as r from 'fs';
import i from 'arg';
import o from 'chalk-template';
import t from 'log4js';
import s from 'path';
t.configure(JSON.parse('{"appenders":{"out":{"layout":{"pattern":"%m%n","type":"pattern"},"type":"stdout"}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'));
let n = t.getLogger(), p = {
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
}, a = Object.keys(p).map((e)=>{
    let r = JSON.parse("{}");
    return r[e] = p[e].type, r;
}).reduce((e, r)=>Object.assign(r, e)), l = Object.keys(p).map((e)=>{
    let r = JSON.parse("{}");
    return r[p[e].alias] = e, r;
}).reduce((e, r)=>Object.assign(r, e)), d = {
    ...a,
    ...l
};
try {
    let m = i(d), f = JSON.parse(Buffer.from(r.readFileSync(s.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), y = o`
  {bold USAGE}

      {dim $} {bold ${Object.keys(f.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== m['--help'] && (n.error(y), process.exit(0)), void 0 !== m['--version'] && (n.info(f.version), process.exit(0)), void 0 === m['--cert'] && (n.error('The certificate file path must be specified.'), process.exit(1)), void 0 === m['--keyId'] && (n.error('Key ID must be specified.'), process.exit(1)), void 0 === m['--issuerId'] && (n.error('Issuer ID must be specified.'), process.exit(1));
    let c = m['--cert'], u = r.readFileSync(c, JSON.parse('{"flag":"r"}')), v = e.tokenSync(u, m['--issuerId'], m['--keyId'], void 0);
    n.info(o`
{bold token}
${v}
`);
} catch (I) {
    n.error(I), process.exit(1);
}
