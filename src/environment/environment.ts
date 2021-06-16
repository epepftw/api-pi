import * as dotenv from 'dotenv';
import path from 'path';

/**
 * .env - Environment Variables Initialization
 */
dotenv.config({
    path: path.join(__dirname, '../../', '.env')
});

export const environment = {
    base_url: `${process.env.API}/api`,
    getters: {
        get_all_contents: '/media/getall'
    }
}