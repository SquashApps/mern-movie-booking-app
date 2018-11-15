'use strict';

const production = process.env.NODE_ENV === 'production';

// Modules loading
import statuses from 'statuses';

module.exports = () => {
  return function apiErrorHandler(err, req, res, next) { /* eslint no-unused-vars:0 */

    let status = err.status || err.statusCode || res.statusCode || 500;
    if (status < 400) {
      status = 500;
    }

    let body = {
      status: status,
      message: err.message || statuses[status]
    };

    // add the stacktrace when not in production
    if (!production) {
      body.stack = err.stack;
    }

    // internal server errors
    if (status >= 500) {
      body.message = statuses[status]; // generic error message
    }

    res.status(status).send(`<h4>Server Error </h4>
       <div style="background: yellow; padding: 10px;">
        <h4>Status: </h4>
        <span>${body.status}</span>
        <h4>Message:</h4>
        <span>${body.message}</span>
        <h4>Stack Trace:</h4>
        <p>${body.stack}</p>
       </div>`);
  };
};
