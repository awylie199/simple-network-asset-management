if (['production', 'development', 'staging'].indexOf(process.env.NODE_ENV) === -1) {
    throw new Error(`unknown env: ${process.env.NODE_ENV}`);
}

const path = require('path'),
    fs = require('fs'),
    winston = require('winston'),
    express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    helmet = require('helmet'),
    {check, validationResult} = require('express-validator/check');

const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ]
});

const assetsPath = path.join(__dirname, 'public/assets.json');

/**
 * Render the Page With Preloaded Redux State and Components
 *
 * @returns {string}                Rendered HTML Page
 */
function renderFullPage() {
    let robots = process.env.NODE_ENV === 'production' ?
        'index,follow' : 'noindex, nofollow';

    return `
    <!doctype html>
    <html lang='en' dir='ltr'>
        <head>
            <meta charset='utf-8' />
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='description' content='A simple network asset management system' />
            <meta name='author' content='Inflowmatix' />
            <meta name='keywords' content='simple, network, asset, management' />
            <meta name='robots' content='${robots}' />
            <title>Simple Network Asset Management</title>
        </head>
        <body>
            <div class="root" id="root"></div>
            <script src="/bundle.js"></script>
        </body>
    </html>
    `;
}

/**
 * Initialize Express App with Middleware and Routes
 *
 * @param {Object} app    Express Server Instance
 * @return {void}
 */
function setupExpress(app) {
    app.use(helmet());
    app.use(compression());
    app.use(morgan('tiny'));
    app.use(express.json());
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.use(express.static(path.resolve(__dirname, 'public')));

    app.get('/', function(req, res) {
        res.send(renderFullPage());
    });

    app.get('/assets', function(req, res) {
        // We read the file instead of importing it - if the page is refreshed,
        // the original JSON file is served, not an updated version.
        fs.readFile(assetsPath, function (err, data) {
            if (err) {
                logger.error('error reading assets path');
                return res.status(500);
            }

            let assets = JSON.parse(data);

            res.json(assets);
        });
    });

    // The route requires specific parameters:
    // 'Name' - a string that is not empty
    // 'Description' - a string that is not empty
    // 'Location.Latitude' - A string that can be cast to a long decimal
    // 'Location.Longitude' - A string that can be cast to a long decimal
    app.post('/assets', [
        check('name').not().isEmpty().trim().escape(),
        check('description').not().isEmpty().trim().escape(),
        check('location.latitude').not().isEmpty().trim().toFloat(),
        check('location.longitude').not().isEmpty().trim().toFloat(),
    ], function(req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.info('invalid asset data');

            return res.status(422).json({
                errors: errors.array()
            });
        }

        fs.readFile(assetsPath, function (err, data) {
            try {
                if (err) {
                    logger.error('error reading assets path');
                    return res.status(500);
                }

                let assets = JSON.parse(data);

                assets.push(req.body);

                logger.info('adding asset to assets file');

                fs.writeFile(
                    assetsPath,
                    JSON.stringify(assets),
                    function() {
                        res.json({
                            assets,
                        });
                    }
                );
            } catch (err) {
                return res.status(500);
            }
        });
    });

    app.use(function(req, res) {
        res.status(404);
        res.send('404: File Not Found');
    });
}

const app = express();

setupExpress(app);

app.listen(+PORT, function() {
    logger.info(`${process.env.NODE_ENV} server listening on port: ${PORT}`);
});
