import a from"appstore-connect-jwt-generator-core";import*as b from"fs";import c from"arg";import d from"chalk";import e from"log4js";import f from"path";e.configure(JSON.parse("{\"appenders\":{\"out\":{\"layout\":{\"pattern\":\"%m%n\",\"type\":\"pattern\"},\"type\":\"stdout\"}},\"categories\":{\"default\":{\"appenders\":[\"out\"],\"level\":\"info\"}}}"));const logger=e.getLogger(),argDef={"--help":{type:Boolean,alias:"-h"},"--version":{type:Boolean,alias:"-v"},"--cert":{type:String,alias:"-c"},"--keyId":{type:String,alias:"-k"},"--issuerId":{type:String,alias:"-i"}},options=Object.keys(argDef).map(g=>{const h=JSON.parse("{}");return h[g]=argDef[g].type,h}).reduce((i,j)=>Object.assign(j,i)),aliases=Object.keys(argDef).map(k=>{const l=JSON.parse("{}");return l[argDef[k].alias]=k,l}).reduce((m,n)=>Object.assign(n,m)),argConfig={...options,...aliases};try{const o=c(argConfig),p=JSON.parse(Buffer.from(b.readFileSync(f.resolve("package.json"),JSON.parse("{\"flag\":\"r\"}"))).toString()),q=d`
    {bold USAGE}

        {dim $} {bold ${Object.keys(p.bin).pop()}} [--help] --string {underline some-arg}

    {bold OPTIONS}
        --help                 Shows this help message
        --version              Print version of this module
        --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
        --keyId {underline key-id}         Key ID for AppStore Connect API
        --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
  `;void 0!==o["--help"]&&(logger.error(q),process.exit(0)),void 0!==o["--version"]&&(logger.info(p.version),process.exit(0)),void 0===o["--cert"]&&(logger.error("The certificate file path must be specified."),process.exit(1)),void 0===o["--keyId"]&&(logger.error("Key ID must be specified."),process.exit(1)),void 0===o["--issuerId"]&&(logger.error("Issuer ID must be specified."),process.exit(1));const r=o["--cert"],s=b.readFileSync(r,JSON.parse("{\"flag\":\"r\"}")),t=a.tokenSync(s,o["--issuerId"],o["--keyId"]);logger.info(d`
{bold token}
${t}
  `)}catch(u){logger.error(u),process.exit(1)}

//# sourceMappingURL=main.js.map