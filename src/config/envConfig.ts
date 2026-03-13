

export  const envConfig =     {

    server:{
        PORT : process.env.PORT
    } ,

    dataBase :{
        DATABASE_URL : process.env.DATABASE_URL || ''
    } ,

    jwt:{
        REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
        ACCESS_TOKEN_KEY :process.env.JWT_ACCESS_TOKEN_KEY
    },

    
     


}