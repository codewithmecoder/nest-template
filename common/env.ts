export const env = {
  // Add your own properties here however you'd like
  port: parseInt(process.env.PORT, 10) || 3030,
  database: {
    url: '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'mysecretkey',
  },
};
