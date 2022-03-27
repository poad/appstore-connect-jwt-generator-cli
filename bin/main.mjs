import h from 'appstore-connect-jwt-generator-core';
import * as c from 'fs';
import i from 'arg';
import d from 'chalk-template';
import e from 'log4js';
import j from 'path';
e.configure(JSON.parse('{"appenders":{"out":{"layout":{"pattern":"%m%n","type":"pattern"},"type":"stdout"}},"categories":{"default":{"appenders":["out"],"level":"info"}}}'));
const b = e.getLogger(), f = {
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
}, k = Object.keys(f).map((a)=>{
    const b = JSON.parse("{}");
    return b[a] = f[a].type, b;
}).reduce((a, b)=>Object.assign(b, a)
), l = Object.keys(f).map((a)=>{
    const b = JSON.parse("{}");
    return b[f[a].alias] = a, b;
}).reduce((a, b)=>Object.assign(b, a)
);
try {
    const a = i({
        ...k,
        ...l
    }), g = JSON.parse(Buffer.from(c.readFileSync(j.resolve('package.json'), JSON.parse('{"flag":"r"}'))).toString()), m = d`
  {bold USAGE}

      {dim $} {bold ${Object.keys(g.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== a['--help'] && (b.error(m), process.exit(0)), void 0 !== a['--version'] && (b.info(g.version), process.exit(0)), void 0 === a['--cert'] && (b.error('The certificate file path must be specified.'), process.exit(1)), void 0 === a['--keyId'] && (b.error('Key ID must be specified.'), process.exit(1)), void 0 === a['--issuerId'] && (b.error('Issuer ID must be specified.'), process.exit(1));
    const n = a['--cert'], o = c.readFileSync(n, JSON.parse('{"flag":"r"}')), p = h.tokenSync(o, a['--issuerId'], a['--keyId'], void 0);
    b.info(d`
{bold token}
${p}
`);
} catch (q) {
    b.error(q), process.exit(1);
}
