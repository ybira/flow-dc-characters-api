export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    name: process.env.DB_NAME,
  },
  auth: {
    secret: process.env.JWT_SECRET,
    saltRounds: parseInt(process.env.AUTH_ROUNDS) || 11,
  },
})
