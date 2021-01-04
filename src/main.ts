import jwt from 'appstore-connect-jwt-generator-core';

import * as fs from 'fs';
import arg from 'arg';
import log4js from 'log4js';

const logger = log4js.getLogger();
logger.level = 'info';

const args = arg({
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

const certPath = args['--cert']!;

const cert = fs.readFileSync(certPath, { flag: 'r' });
const token = jwt.tokenSync(cert, args['--issuerId']!, args['--keyId']!);
logger.info(`token: ${token}`);
