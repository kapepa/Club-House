const config = {
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://localhost:5000',
  api: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.API_URL,
}

export { config };