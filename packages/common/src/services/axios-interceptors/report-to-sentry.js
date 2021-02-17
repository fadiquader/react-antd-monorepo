import _ from 'lodash';
import { reportToSentry } from '../../utils/sentry-util';
export const errorCallback = error => {
  if (_.get(error, 'response.status') !== 401) {
    reportToSentry(error);
  }

  return Promise.reject(error);
};

export const successCallback = response => response;
export default { successCallback, errorCallback };
