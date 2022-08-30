export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://gabes:123@0.0.0.0:27017/',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'hAi*jj2moA092kA'
}
