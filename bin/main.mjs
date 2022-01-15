import a from "appstore-connect-jwt-generator-core";
import * as b from "fs";
import c from "arg";
import d from "chalk-template";
import e from "log4js";
import f from "path";
e.configure(JSON.parse("{\"appenders\":{\"out\":{\"layout\":{\"pattern\":\"%m%n\",\"type\":\"pattern\"},\"type\":\"stdout\"}},\"categories\":{\"default\":{\"appenders\":[\"out\"],\"level\":\"info\"}}}"));
const g = e.getLogger(), h = {
    "--help": {
        type: Boolean,
        alias: "-h"
    },
    "--version": {
        type: Boolean,
        alias: "-v"
    },
    "--cert": {
        type: String,
        alias: "-c"
    },
    "--keyId": {
        type: String,
        alias: "-k"
    },
    "--issuerId": {
        type: String,
        alias: "-i"
    }
}, i = Object.keys(h).map((a)=>{
    const b = JSON.parse("{}");
    return b[a] = h[a].type, b;
}).reduce((a, b)=>Object.assign(b, a)
), j = Object.keys(h).map((a)=>{
    const b = JSON.parse("{}");
    return b[h[a].alias] = a, b;
}).reduce((a, b)=>Object.assign(b, a)
);
try {
    const k = c({
        ...i,
        ...j
    }), l = JSON.parse(Buffer.from(b.readFileSync(f.resolve("package.json"), JSON.parse("{\"flag\":\"r\"}"))).toString()), m = d`
  {bold USAGE}

      {dim $} {bold ${Object.keys(l.bin).pop()}} [--help] --string {underline some-arg}

  {bold OPTIONS}
      --help                 Shows this help message
      --version              Print version of this module
      --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
      --keyId {underline key-id}         Key ID for AppStore Connect API
      --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
`;
    void 0 !== k["--help"] && (g.error(m), process.exit(0)), void 0 !== k["--version"] && (g.info(l.version), process.exit(0)), void 0 === k["--cert"] && (g.error("The certificate file path must be specified."), process.exit(1)), void 0 === k["--keyId"] && (g.error("Key ID must be specified."), process.exit(1)), void 0 === k["--issuerId"] && (g.error("Issuer ID must be specified."), process.exit(1));
    const n = k["--cert"], o = b.readFileSync(n, JSON.parse("{\"flag\":\"r\"}")), p = a.tokenSync(o, k["--issuerId"], k["--keyId"], void 0);
    g.info(d`
{bold token}
${p}
`);
} catch (q) {
    g.error(q), process.exit(1);
}
