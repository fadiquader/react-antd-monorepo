import get from 'lodash/get';

import { showErrorNotification } from '../../utils/showErrorNotification';

const SUSPENDED_MESSAGE = 'Your account has been suspended. Please contact MeeOpp Support.';

const successCallback = response => response;

const isAccountSuspendedError = error => {
  if (get(error, 'response.status') !== 403) return false;

  return get(error, 'response.data.data.suspended') || get(error, 'data.suspended');
};

const errorCallback = error => {
  if (isAccountSuspendedError(error)) {
    showErrorNotification(SUSPENDED_MESSAGE);

    return Promise.reject(new Error(SUSPENDED_MESSAGE));
  }

  return Promise.reject(error);
};

export default { successCallback, errorCallback };
