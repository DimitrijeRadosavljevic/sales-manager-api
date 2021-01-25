export const baseConfig = {
  port: 3000,
  secrets: {
    jwt: 'sabali',
    // jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  },
  dbUrl: 'mongodb://localhost:27017/sales-manager'
}

