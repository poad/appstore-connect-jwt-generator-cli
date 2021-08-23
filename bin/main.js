"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appstore_connect_jwt_generator_core_1 = __importDefault(require("appstore-connect-jwt-generator-core"));
const fs = __importStar(require("fs"));
const arg_1 = __importDefault(require("arg"));
const chalk_1 = __importDefault(require("chalk"));
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%m%n',
            },
        },
    },
    categories: { default: { appenders: ['out'], level: 'info' } },
});
const logger = log4js_1.default.getLogger();
const argDef = {
    '--help': {
        type: Boolean,
        alias: '-h',
    },
    '--version': {
        type: Boolean,
        alias: '-v',
    },
    '--cert': {
        type: String,
        alias: '-c',
    },
    '--keyId': {
        type: String,
        alias: '-k',
    },
    '--issuerId': {
        type: String,
        alias: '-i',
    },
};
const options = Object.keys(argDef)
    .map((key) => {
    const target = {};
    target[key] = argDef[key].type;
    return target;
})
    .reduce((cur, acc) => Object.assign(acc, cur));
const aliases = Object.keys(argDef)
    .map((key) => {
    const target = {};
    target[argDef[key].alias] = key;
    return target;
})
    .reduce((cur, acc) => Object.assign(acc, cur));
const argConfig = {
    // Types
    ...options,
    // Aliases
    ...aliases,
};
try {
    const args = arg_1.default(argConfig);
    // eslint-disable-next-line global-require
    const packageJson = require('../package.json');
    const helpMessage = chalk_1.default `
    {bold USAGE}

        {dim $} {bold ${Object.keys(packageJson.bin).pop()}} [--help] --string {underline some-arg}

    {bold OPTIONS}
        --help                 Shows this help message
        --version              Print version of this module
        --cert {underline cert-file-path}  Private certificate file path for AppStore Connect API
        --keyId {underline key-id}         Key ID for AppStore Connect API
        --issuerId {underline issuer-id}   Issuer ID for AppStore Connect API
  `;
    if (args['--help'] !== undefined) {
        logger.error(helpMessage);
        process.exit(0);
    }
    if (args['--version'] !== undefined) {
        logger.info(packageJson.version);
        process.exit(0);
    }
    if (args['--cert'] === undefined) {
        logger.error('The certificate file path must be specified.');
        process.exit(1);
    }
    if (args['--keyId'] === undefined) {
        logger.error('Key ID must be specified.');
        process.exit(1);
    }
    if (args['--issuerId'] === undefined) {
        logger.error('Issuer ID must be specified.');
        process.exit(1);
    }
    const certPath = args['--cert'];
    const cert = fs.readFileSync(certPath, { flag: 'r' });
    const token = appstore_connect_jwt_generator_core_1.default.tokenSync(cert, args['--issuerId'], args['--keyId']);
    logger.info(chalk_1.default `
{bold token}
${token}
  `);
}
catch (e) {
    logger.error(e);
    process.exit(1);
}
//# sourceMappingURL=main.js.map