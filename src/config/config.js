import configDev from './config.dev.js';
import configProd from './config.prod.js';

const config = process.env.NODE_ENV === 'production' ? configProd : configProd;

export default config;