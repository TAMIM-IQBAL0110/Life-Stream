import rateLimit from 'express-rate-limit'

// Limit requests to 20 per minute per IP
const healthLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,             // limit each IP to 20 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests. Please try again later."
  }
});
export default healthLimiter;