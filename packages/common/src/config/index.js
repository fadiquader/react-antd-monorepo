import devConfig from './development';
import stageConfig from './staging';
import betaConfig from './beta';
import prodConfig from './production';

// eslint-disable-next-line no-undef
const env = process.env.REACT_APP_ENV;
let config = {};

switch (env) {
case 'staging':
  config = stageConfig;
  break;
case 'beta':
  config = betaConfig;
  break;
case 'production':
  config = prodConfig;
  break;
default:
  config = devConfig;
}

export const SERVER_URL = config.SERVER_URL;

export const SOCKET = config.SOCKET;
export const CUSTOM_SOCKET = config.CUSTOM_SOCKET;
export const CUSTOM_APP = config.CUSTOM_APP;
export const WRITING_PAD_SERVER = config.WRITING_PAD_SERVER;

export const GAID = config.GAID;

export const TOKBOX_KEY = config.TOKBOX_KEY;
export const TOKBOX_APIKEY = config.TOKBOX_APIKEY;

export const GOOGLE_RECAPTCHA_SITEKEY = config.GOOGLE_RECAPTCHA_SITEKEY;

export const FB_APP_ID = config.FB_APP_ID;

export const AWS_POLLYREGION = 'ap-northeast-1';
export const AWS_POLLYACCESSKEYID = 'AKIAJ7MQTQHHLTICYXLQ';
export const AWS_POLLYSECRETACCESSKEY = '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';

export const SENTRY_DSN = config.SENTRY_DSN;

export const ENV = env || 'development';

// eslint-disable-next-line no-undef
export const CODE_VERSION = process.env.REACT_APP_GIT_SHA || null;
