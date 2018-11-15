
import express from 'express';
import config from 'config';
import helmet from 'helmet';

// mongoose setup
require('../app/models')();

/**
 * App setup
 */
const app = express();
const port = process.env.PORT || config.get('APP_PORT');

app.use(helmet());
/**
 * Error handler
 */
app.use(require('../app/lib/error-handler.js')());
/**
 * Routes setup
 */
app.use(require('../app/routes')());

/**
 * start server
 */
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on PORT:${port}`);
});