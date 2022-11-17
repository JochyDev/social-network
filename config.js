module.exports = {
    api: {
        port: process.env.API_PORT || 3001
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'joshidev',
        password: process.env.MYSQL_PASS || 'jljsjljs',
        database: process.env.MYSQL_DB || 'social_network',
    }
}