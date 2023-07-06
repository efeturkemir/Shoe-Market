const jwt = require('jsonwebtoken')
async function auth(req, res, next){
    const authHeader = await req.headers.authorization || req.headers.Authorization;
    
    const token = await authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Missing authorization header' });
      }
    
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid or expired token' });
        }
    
       
        next();
      });
    }
module.exports = auth