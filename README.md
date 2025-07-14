# URL Shortener Microservice – 12216960

## How to Run
1. Go to `BackendTestSubmission/` folder  
2. Install dependencies:  
```
npm install
```

3. Start the server:  
```
node server.js
```

4. Server runs on:  
```
[http://localhost:3000](http://localhost:3000)
```

## Available APIs

- `POST /shorturls` – Create a short URL  
- `GET /shorturls/:shortcode` – Get stats for a shortcode  
- `GET /:shortcode` – Redirect to original URL

## Notes

- LoggingMiddleware is integrated and active  
- All logs are sent to the evaluation logging API  
- No database is used; uses in-memory store  
