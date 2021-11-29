import jwt from 'appstore-connect-jwt-generator-core';

import * as fs from 'fs';
import arg from 'arg';
import chalkTemplate from 'chalk-template';
import log4js from 'log4js';
import path from 'path';

log4js.configure({
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
const logger = log4js.getLogger();

interface ArgsDefinition {
  [key: string]: {
    type: StringConstructor | BooleanConstructor | NumberConstructor;
    alias: string;
  };
}

interface Options {
  [key: string]: StringConstructor | BooleanConstructor | NumberConstructor;
}
interface Aliases {
  [key: string]: string;
}

const argDef: ArgsDefinition = {
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

const options: Options = Object.keys(argDef)
  .map((key) => {
    const target: Options = {};
    target[key] = argDef[key].type;
    return target;
  })
  .reduce((cur, acc) => Object.assign(acc, cur));

const aliases: Aliases = Object.keys(argDef)
  .map((key) => {
    const target: Aliases = {};
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
  const args = arg(argConfig);

  const packageJson = JSON.parse(Buffer.from(fs.readFileSync(path.resolve('package.json'), { flag: 'r' })).toString());

  const helpMessage = chalkTemplate`
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

  const certPath = args['--cert']!;

  const cert = fs.readFileSync(certPath, { flag: 'r' });
  const token = jwt.tokenSync(cert, args['--issuerId']!, args['--keyId']!);
  logger.info(chalkTemplate`
{bold token}
${token}
  `);
} catch (e) {
  logger.error(e);
  process.exit(1);
}
