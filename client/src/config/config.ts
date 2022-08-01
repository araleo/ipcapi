export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://ec2-3-16-137-212.us-east-2.compute.amazonaws.com/api/v1/ipca'
    : 'http://localhost:8000/ipca';
