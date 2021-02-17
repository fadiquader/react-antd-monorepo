import handleExpiredToken from './handle-expired-token';
import reportToSentry from './report-to-sentry';
import handleAccountSuspended from './handle-account-suspended';

const forRequests = [];

const forResponses = [
  handleAccountSuspended,
  handleExpiredToken,
  reportToSentry
];

export default { forRequests, forResponses };
