export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://db:27017/clean-node-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'hAi*jj2moA092kA'
}
