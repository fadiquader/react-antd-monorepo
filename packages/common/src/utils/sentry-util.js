import * as Sentry from '@sentry/browser';

export const reportToSentry = (error, context = {}) => Sentry.withScope(scope => {
  if (context.user) {
    scope.setUser(context.user);
  } else if (window.logInUserId) {
    scope.setUser({ _id: window.logInUserId });
  }

  if (context.tags) scope.setTags(context.tags);
  if (context.extra) scope.setExtras(context.extra);
  if (context.level) scope.setLevel(context.level);
  Sentry.captureException(error);
});

function matchesResizeObserverError(error) {
  const { message } = error;
  return message && message.match(/ResizeObserver/);
}

const skipErrorMatchers = Object.freeze([
  matchesResizeObserverError,
]);

export function beforeSend(event, hint) {
  const { originalException } = hint;

  const skipSending = originalException && skipErrorMatchers.some(matcherFn => {
    return matcherFn(originalException);
  });

  // Returning null will instruct Sentry to discard the exception
  if (skipSending) return null;

  return event;
}
