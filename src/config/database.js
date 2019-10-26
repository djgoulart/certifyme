module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5434',
  username: 'postgres',
  password: 'docker',
  database: 'certifyme',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
