import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import * as logsym from 'log-symbols';
import path from 'path';

import { saveContents } from './services/MediaFile.service';
import MediaFileRoutes from './routes/Media.routes';

export class App {
    app: Application = express();
    
    constructor() {
        //env - Environment Variable Initialization 
        dotenv.config();

        // Initialize Middlewares
        this.middlewareInit();

        // Set Public Folder
        this.app.use(express.static(path.join(__dirname, './public')));

        this.app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT)
        });

        this.initRoutes();
    }

    middlewareInit() {
        // CORS
        this.app.use(cors());

        // Body Parser
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: '100mb',
                parameterLimit: 50000,
            }),
        );

        // Morgan
        this.app.use(logger('dev'));
    }

    initRoutes() {
        this.app.use('/api', MediaFileRoutes);
    }
}
