import a from"appstore-connect-jwt-generator-core";import*as b from"fs";import c from"arg";import d from"chalk";import e from"log4js";import f from"path";e.configure(JSON.parse("{\"appenders\":{\"out\":{\"layout\":{\"pattern\":\"%m%n\",\"type\":\"pattern\"},\"type\":\"stdout\"}},\"categories\":{\"default\":{\"appenders\":[\"out\"],\"level\":\"info\"}}}"));const logger=e.getLogger(),argDef={"--help":{type:Boolean,alias:"-h"},"--version":{type:Boolean,alias:"-v"},"--cert":{type:String,alias:"-c"},"--keyId":{type:String,alias:"-k"},"--issuerId":{type:String,alias:"-i"}},options=Object.keys(argDef).map(a=>{const b=JSON.parse("{}");return b[a]=argDef[a].type,b}).reduce((a,b)=>Object.assign(b,a)),aliases=Object.keys(argDef).map(a=>{const b=JSON.parse("{}");return b[argDef[a].alias]=a,b}).reduce((a,b)=>Object.assign(b,a)),argConfig={...options,...aliases};try{const g=c(argConfig),h=JSON.parse(Buffer.from(b.readFileSync(f.resolve("package.json"),JSON.parse("{\"flag\":\"r\"}"))).toString()),i=d`
    {bold USAGE}

        {dim $} {bold ${Object.keys(h.bin).pop()}} [--help] --string {underline some-arg}

    {bold OPTIONS}
        --help                 Shows this help message
        --version              Print version of this module
        --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
        --keyId {underline key-id}         Key ID for AppStore Connect API
        --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
  `;void 0!==g["--help"]&&(logger.error(i),process.exit(0)),void 0!==g["--version"]&&(logger.info(h.version),process.exit(0)),void 0===g["--cert"]&&(logger.error("The certificate file path must be specified."),process.exit(1)),void 0===g["--keyId"]&&(logger.error("Key ID must be specified."),process.exit(1)),void 0===g["--issuerId"]&&(logger.error("Issuer ID must be specified."),process.exit(1));const j=g["--cert"],k=b.readFileSync(j,JSON.parse("{\"flag\":\"r\"}")),l=a.tokenSync(k,g["--issuerId"],g["--keyId"]);logger.info(d`
{bold token}
${l}
  `)}catch(m){logger.error(m),process.exit(1)}

//# sourceMappingURL=main.js.map