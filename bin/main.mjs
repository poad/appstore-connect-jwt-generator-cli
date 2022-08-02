import a from 'appstore-connect-jwt-generator-core';
import * as b from 'fs';
import c from 'arg';
import d from 'chalk-template';
import e from 'log4js';
import f from 'path';
e.configure(JSON.parse('{"appenders":{"out":{"layout":{"pattern":"%m%n","type":"pattern"},"type":"stdout"}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'));
let g = e.getLogger(), h = {
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
}, i = Object.keys(h).map((a)=>{
    let b = JSON.parse("{}");
    return b[a] = h[a].type, b;
}).reduce((a, b)=>Object.assign(b, a)), j = Object.keys(h).map((a)=>{
    let b = JSON.parse("{}");
    return b[h[a].alias] = a, b;
}).reduce((a, b)=>Object.assign(b, a)), k = {
    ...i,
    ...j
};
try {
    let l = c(k), m = JSON.parse(Buffer.from(b.readFileSync(f.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), n = d`
  {bold USAGE}

      {dim $} {bold ${Object.keys(m.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== l['--help'] && (g.error(n), process.exit(0)), void 0 !== l['--version'] && (g.info(m.version), process.exit(0)), void 0 === l['--cert'] && (g.error('The certificate file path must be specified.'), process.exit(1)), void 0 === l['--keyId'] && (g.error('Key ID must be specified.'), process.exit(1)), void 0 === l['--issuerId'] && (g.error('Issuer ID must be specified.'), process.exit(1));
    let o = l['--cert'], p = b.readFileSync(o, JSON.parse('{"flag":"r"}')), q = a.tokenSync(p, l['--issuerId'], l['--keyId'], void 0);
    g.info(d`
{bold token}
${q}
`);
} catch (r) {
    g.error(r), process.exit(1);
}
