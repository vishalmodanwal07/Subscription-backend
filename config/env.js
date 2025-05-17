import {config} from "dotenv"; // dotenv help in load env into process.env object

config({
    path : `.env.${process.env.NODE_ENV || 'development'}.local`
    //import all env by default development
});

export const {PORT , NODE_ENV} = process.env; //export all env or accessing variable from env