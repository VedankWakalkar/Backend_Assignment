// import {config} from "dotenv";
// // config({
// //     path:path.resolve(process.cwd(),`env.${process.env.NODE_ENV || 'development' }.local`)
// // })
// config({
//     path:`.env.${process.env.NODE_ENV || 'development'}`.local
// })

// export const {
//     PORT,JWT_SECRET,JWT_EXPIRES_IN,NODE_ENV,DB_URI
// }=process.env;

import {config} from "dotenv"
import path from "path";

config({
    path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`)
  });
  
export const {
    PORT,JWT_SECRET,JWT_EXPIRES_IN,
    DB_URI,NODE_ENV
}=process.env;