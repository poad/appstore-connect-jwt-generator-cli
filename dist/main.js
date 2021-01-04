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
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger();
logger.level = 'info';
const args = arg_1.default({
    // Types
    '--help': Boolean,
    '--version': Boolean,
    '--cert': String,
    '--keyId': String,
    '--issuerId': String,
    // Aliases
    '-v': '--version',
    '-c': '--cert',
    '-k': '--keyId',
    '-i': '--issuerId',
});
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
logger.info(`token: ${token}`);
