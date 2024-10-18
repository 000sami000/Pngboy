
## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB


---

## Environment Setup


### Backend .env Configuration
In the root of the backend folder, create a `.env` file with the following configuration:

```env
JWT_SECRET=your_jwt_secret
PORT=5000
MONGODB_CONNECTION_URL_LOCAL=your_local_database_url
MONGODB_CONNECTION_URL=your_production_database_url

### Frontend .env Configuration
In the root of the Frontend folder, create a `.env` file with the following configuration:
```env
VITE_backendUrl=http://localhost:5000

