import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

import { SERVER_URL } from './../config';
import axiosInterceptors from './axios-interceptors';

const restClient = rest(SERVER_URL);

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axiosInterceptors.forRequests.forEach(i => {
  axios.interceptors.request.use(i.configCallback, i.errorCallback);
});

axiosInterceptors.forResponses.forEach(i => {
  axios.interceptors.response.use(i.successCallback, i.errorCallback);
});

const feathersClient = feathers()
  .configure(restClient.axios(axios))
  .configure(
    auth({
      storageKey: 'MeeOppJWT',
    }),
  );

export default feathersClient;
