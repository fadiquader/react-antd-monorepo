import axios from 'axios';
import _ from 'lodash';
import feathersClient from '../feathersClient-rest';
import feathersSocketClient from '../feathersClient-websocket';
import { getRefreshTokenPayload, setRefreshTokenPayload } from 'utils/auth';

const successCallback = response => response;

const isTokenExpiredError = error => {
  if (_.get(error, 'response.status') !== 401) return false;
  return _.get(error, 'response.data.data.name') === 'TokenExpiredError';
};

const isAuthRoute = url => {
  const { pathname } = new URL(url);
  return pathname === '/authentication';
};

const errorCallback = async error => {
  const refreshTokenPayload = getRefreshTokenPayload();

  const shouldReject = !isTokenExpiredError(error) || !refreshTokenPayload || isAuthRoute(error.config.url);

  if (shouldReject) return Promise.reject(error);

  try {
    const { accessToken } = await feathersClient.service('refresh-tokens').create({
      refreshToken: refreshTokenPayload.refreshToken,
      _id: refreshTokenPayload.userId,
      deviceId: refreshTokenPayload.deviceId
    });

    const { refreshToken: newRefreshToken, user } = await feathersClient.authenticate({
      strategy: 'jwt',
      accessToken,
      deviceId: refreshTokenPayload.deviceId
    });

    await feathersSocketClient.authenticate({
      strategy: 'jwt',
      accessToken,
    });

    if (newRefreshToken !== refreshTokenPayload.refreshToken) {
      setRefreshTokenPayload({
        ...refreshTokenPayload,
        userId: user._id,
        refreshToken: newRefreshToken
      });
    }

    localStorage.setItem('MeeOppJWT', accessToken);
    error.config.headers['Authorization'] = accessToken;
    const response = await axios.request(error.config);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(error);
  }
};

export default { successCallback, errorCallback };
