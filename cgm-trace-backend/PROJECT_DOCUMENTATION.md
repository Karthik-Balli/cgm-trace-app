# CGM Trace API - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Folder Structure](#folder-structure)
5. [Core Packages & Dependencies](#core-packages--dependencies)
6. [Application Flow](#application-flow)
7. [API Endpoints](#api-endpoints)
8. [Database Design](#database-design)
9. [Authentication & Security](#authentication--security)
10. [Key Components Explained](#key-components-explained)
11. [Setup & Running](#setup--running)

---

## 1. Project Overview

**CGM Trace API** is a Python-based FastAPI backend application for managing Continuous Glucose Monitoring (CGM) data. 

**Purpose:**
- Users can upload CGM data (typically from CSV files)
- The system stores glucose readings in a database
- Provides analytics and insights (average, min, max, time-in-range)
- Offers ML-based recommendations for glucose management
- Implements JWT-based authentication for secure access

**Use Case:**
This is designed for diabetes care management, helping patients and doctors track blood glucose trends and receive actionable insights.

---

## 2. Technology Stack

### Backend Framework
- **FastAPI** (v0.100.0) - Modern async web framework (similar to Express.js for Node.js)
  - Type-safe with automatic documentation
  - Built-in OpenAPI/Swagger documentation
  - High performance with async/await support

### Server & Runtime
- **Uvicorn** (v0.22.0) - ASGI server (similar to Node's http server)
  - Runs FastAPI application
  - Supports hot-reload for development
  - Multi-worker support for production

### Database
- **MongoDB** (NoSQL database)
- **Motor** (v3.4.0) - Async MongoDB driver
  - Provides non-blocking async operations
  - Integrates seamlessly with FastAPI's async nature
- **PyMongo** (v4.7.2) - MongoDB Python driver (dependency of Motor)

### Data Processing
- **Pandas** (v2.2.2) - Data manipulation and analysis
  - Used for CSV parsing and date/time operations
  - Handles data cleaning and filtering
- **NumPy** (v1.26.4) - Numerical computing
  - Used in ML analysis for array operations

### Validation & Configuration
- **Pydantic** (v2.5.0) - Data validation and parsing
  - Schema validation for request/response bodies
  - Type hints and automatic documentation
- **Pydantic-settings** (v2.1.0) - Environment configuration management
  - Loads settings from .env files
  - Type-safe environment variables

### Security & Authentication
- **python-jose** (v3.3.0) - JWT token handling
  - Encodes/decodes JWT tokens
  - Uses RS256 algorithm (RSA with SHA256)
  - Requires public/private key pairs
- **EmailStr** (from Pydantic) - Email validation

### Machine Learning (Optional)
- **scikit-learn** (v1.4.0) - ML algorithms and models
  - Placeholder for future ML model training
  - Can train predictive models for glucose trends
- **NumPy** - Matrix operations for ML

### File Handling
- **python-multipart** (v0.0.6) - Multipart form data parsing
  - Handles file uploads (CSV files)
- **aiofiles** (v23.2.1) - Async file operations
  - Non-blocking file read/write

### Logging
- **Loguru** (v0.7.0) - Enhanced logging library
  - Better error tracking and debugging
  - Structured logging with context

### Testing
- **pytest** (v7.4.2) - Testing framework
  - Unit and integration testing
  - Fixtures and plugins

### Environment Management
- **python-dotenv** (v1.0.0) - Load .env files
  - Securely manage secrets and configuration

---

## 3. Project Architecture

The application follows a **layered architecture** pattern:

```
┌─────────────────────────────────────────────────┐
│         HTTP Requests (Clients/UI)              │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│     ROUTES LAYER (API Endpoints)                │
│  glucose_routes, auth_routes, insights_routes,  │
│           ml_routes                             │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│     MIDDLEWARE LAYER (Auth, Validation)         │
│  JWT verification, Dependency Injection         │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│    SERVICES LAYER (Business Logic)              │
│  glucose_service, insight_service, ml_service   │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│     UTILITIES LAYER (Helper Functions)          │
│  csv_parser, jwt_security                       │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│     DATABASE LAYER (MongoDB Connection)         │
│  config/db.py - Motor async client              │
└────────────────────┬────────────────────────────┘
                     │
┌─────────────────────▼────────────────────────────┐
│        MongoDB (Data Persistence)               │
└─────────────────────────────────────────────────┘
```

This architecture ensures:
- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Services can be tested independently
- **Maintainability**: Easy to understand and modify
- **Scalability**: Easy to add new features

---

## 4. Folder Structure

```
cgm-trace-backend/
├── main.py                          # Application entry point
├── requirements.txt                 # Python dependencies
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Multi-container orchestration
├── .env                            # Environment variables (secrets)
├── .venv/                          # Python virtual environment
│
├── app/
│   ├── __init__.py                 # Package marker
│   │
│   ├── config/
│   │   ├── settings.py             # Configuration management
│   │   └── db.py                   # MongoDB connection & setup
│   │
│   ├── models/
│   │   └── user_model.py           # User data structure
│   │
│   ├── schemas/
│   │   ├── glucose_schema.py       # Glucose data validation
│   │   └── insight_schema.py       # Insight data validation
│   │
│   ├── routes/
│   │   ├── auth_routes.py          # Authentication endpoints
│   │   ├── glucose_routes.py       # Glucose data endpoints
│   │   ├── insights_routes.py      # Analytics endpoints
│   │   └── ml_routes.py            # ML prediction endpoints
│   │
│   ├── services/
│   │   ├── glucose_service.py      # Glucose data business logic
│   │   ├── insight_service.py      # Analytics business logic
│   │   └── ml_service.py           # ML prediction logic
│   │
│   └── utils/
│       ├── csv_parser.py           # CSV file parsing
│       └── jwt_security.py         # JWT authentication
│
└── docs/
    └── README.md
```

### Key Directories:

1. **app/** - Main application package
2. **app/config/** - Configuration and database setup
3. **app/models/** - Data models (similar to schemas in TypeScript)
4. **app/schemas/** - Pydantic validation schemas (like Zod in Node.js)
5. **app/routes/** - API endpoint definitions
6. **app/services/** - Business logic layer
7. **app/utils/** - Helper utilities

---

## 5. Core Packages & Dependencies

### Package Explanations (with Node.js Equivalents):

| Package | Version | Purpose | Node Equivalent |
|---------|---------|---------|-----------------|
| **fastapi** | 0.100.0 | Web framework | Express.js |
| **uvicorn** | 0.22.0 | ASGI server | Node HTTP server |
| **motor** | 3.4.0 | Async MongoDB driver | mongoose (with async) |
| **pymongo** | 4.7.2 | MongoDB driver (Motor dependency) | - |
| **pydantic** | 2.5.0 | Data validation | Zod, Joi |
| **pydantic-settings** | 2.1.0 | Config management | dotenv |
| **pandas** | 2.2.2 | Data processing | pandas-js, danfo.js |
| **numpy** | 1.26.4 | Numerical computing | stdlib, numjs |
| **python-jose** | 3.3.0 | JWT handling | jsonwebtoken |
| **scikit-learn** | 1.4.0 | ML algorithms | TensorFlow.js |
| **aiofiles** | 23.2.1 | Async file operations | fs/promises |
| **python-multipart** | 0.0.6 | File upload handling | multer, busboy |
| **loguru** | 0.7.0 | Logging | winston, pino |
| **pytest** | 7.4.2 | Testing framework | Jest, Mocha |
| **python-dotenv** | 1.0.0 | Env variables | dotenv |

---

## 6. Application Flow

### Complete Request-Response Flow:

```
1. CLIENT REQUEST
   ├─ POST /glucose/upload (with CSV file)
   ├─ GET /glucose/points
   ├─ GET /auth/whoami
   ├─ GET /insights/summary
   └─ GET /ml/recommend

2. FASTAPI RECEIVES REQUEST
   ├─ Routes request to appropriate handler
   └─ Dependency injection begins

3. AUTHENTICATION (if protected endpoint)
   ├─ Extract Authorization header: "Bearer <JWT_TOKEN>"
   ├─ Verify JWT signature using public key
   ├─ Extract user_id from token payload
   └─ Attach user object to request

4. VALIDATION
   ├─ Pydantic validates request body
   ├─ Checks types and constraints
   └─ Raises HTTPException if invalid

5. SERVICE LAYER PROCESSING
   ├─ Business logic executes
   ├─ Data transformations occur
   └─ External calls (database, ML)

6. DATABASE OPERATIONS
   ├─ Motor executes async MongoDB queries
   ├─ Results returned
   └─ Non-blocking operation completes

7. RESPONSE FORMATTING
   ├─ Pydantic serializes response
   ├─ JSON conversion
   └─ HTTP 200 status

8. CLIENT RECEIVES RESPONSE
   └─ Response body with data/errors
```

### Async/Await Pattern (Important for Python developers):

Python uses async/await (similar to JavaScript promises) for non-blocking operations:

```python
# This is NOT blocking - database operation runs in parallel
async def fetch_points(user_id: str):
    # Database call doesn't block other requests
    result = await db["glucose"].find({"user_id": user_id}).to_list()
    return result
```

Think of `async` as "this function is non-blocking" and `await` as "wait for this operation, but let others run meanwhile".

---

## 7. API Endpoints

### Authentication Endpoints

#### `GET /auth/whoami`
- **Purpose**: Verify JWT token and get current user info
- **Authentication**: Required (Bearer token)
- **Request Headers**:
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response**:
  ```json
  {
    "user": {
      "id": "user123",
      "sub": "user123",
      "email": "user@example.com"
    }
  }
  ```

---

### Glucose Data Endpoints

#### `POST /glucose/upload`
- **Purpose**: Upload CGM data via CSV file
- **Authentication**: Required
- **Request**:
  ```
  Content-Type: multipart/form-data
  Authorization: Bearer <TOKEN>
  
  Body:
  - file: (CSV file)
  - start_date: "2024-01-01" (optional)
  - end_date: "2024-12-31" (optional)
  ```
- **CSV Format Expected**:
  ```
  DisplayDtTm,Glucose Value
  2024-01-01 08:00:00,120
  2024-01-01 08:05:00,125
  ```
- **Response**:
  ```json
  {
    "inserted_count": 1440
  }
  ```
- **Process**:
  1. File uploaded
  2. CSV parsed using pandas
  3. Columns normalized (handles different CSV formats)
  4. Date-time parsing
  5. Invalid rows dropped
  6. Bulk insert to MongoDB

#### `GET /glucose/points`
- **Purpose**: Retrieve glucose readings for current user
- **Authentication**: Required
- **Query Parameters**:
  ```
  limit: 2000 (default)
  start: "2024-01-01T00:00:00" (ISO format, optional)
  end: "2024-12-31T23:59:59" (ISO format, optional)
  ```
- **Response**:
  ```json
  {
    "points_count": 100,
    "points": [
      {
        "_id": "ObjectId",
        "user_id": "user123",
        "timestamp": "2024-01-01T08:00:00",
        "glucose_value": 120.5
      }
    ]
  }
  ```

---

### Insights (Analytics) Endpoints

#### `GET /insights/summary`
- **Purpose**: Get glucose statistics and insights
- **Authentication**: Required
- **Query Parameters**:
  ```
  start: "2024-01-01T00:00:00" (optional)
  end: "2024-12-31T23:59:59" (optional)
  lower_bound: 70.0 (target min)
  upper_bound: 180.0 (target max)
  ```
- **Response**:
  ```json
  {
    "user_id": "user123",
    "start": "2024-01-01T00:00:00",
    "end": "2024-12-31T23:59:59",
    "avg_glucose": 125.3,
    "min_glucose": 65.0,
    "max_glucose": 280.0,
    "time_in_range_pct": 78.5,
    "total_points": 1440,
    "highs_count": 150,
    "lows_count": 45
  }
  ```
- **Calculations**:
  - `avg_glucose` = Sum of all glucose / Total readings
  - `time_in_range_pct` = (Readings between lower_bound and upper_bound / Total) × 100
  - `highs_count` = Readings above upper_bound
  - `lows_count` = Readings below lower_bound

---

### ML/Prediction Endpoints

#### `GET /ml/recommend`
- **Purpose**: Get AI-based glucose management recommendations
- **Authentication**: Required
- **Query Parameters**:
  ```
  method: "rule" or "ml" (default: "rule")
  lookback: 6 (number of recent readings to analyze)
  ```
- **Response (Rule-Based)**:
  ```json
  {
    "risk": "high",
    "score": 0.9,
    "advice": "Rapid fall detected. Consider fast carbs & retest in 15 min."
  }
  ```
- **Risk Levels**:
  - `"low"` (score 0.0-0.3): Glucose stable
  - `"medium"` (score 0.3-0.7): Glucose trending
  - `"high"` (score 0.7-1.0): Urgent action needed

---

## 8. Database Design

### MongoDB Collections

#### 1. **glucose** Collection
```javascript
{
  _id: ObjectId,
  user_id: "string",           // Foreign key to users
  timestamp: ISODate,          // When reading was taken
  glucose_value: number        // Blood glucose in mg/dL
}
```

**Indexes Created**:
```python
# Compound index for efficient querying
db.glucose.create_index([("user_id", 1), ("timestamp", -1)])

# Helps queries like:
# db.glucose.find({user_id: "123", timestamp: {$gte: start, $lte: end}})
```

**Why This Index?**
- `user_id` first: Narrows down to one user's data (most selective)
- `timestamp` descending: For time-range queries

#### 2. **users** Collection
```javascript
{
  _id: ObjectId or string,
  email: "string" (unique),    // Login identifier
  name: "string",              // Display name
  role: "patient|doctor|admin" // Permission level
}
```

**Indexes Created**:
```python
# Unique index for fast email lookup
db.users.create_index("email", {unique: true})
```

### Aggregation Pipeline Example

```python
# Calculate statistics in one database query
pipeline = [
    {"$match": {"user_id": "123"}},  # Filter to user's data
    {"$project": {"glucose_value": 1}},  # Select columns
    {"$group": {
        "_id": None,
        "count": {"$sum": 1},           # Total readings
        "sum": {"$sum": "$glucose_value"},  # Sum for avg
        "min": {"$min": "$glucose_value"},  # Minimum
        "max": {"$max": "$glucose_value"}   # Maximum
    }}
]
```

---

## 9. Authentication & Security

### JWT Token Flow

```
1. USER AUTHENTICATES (External Auth Service)
   ├─ Provides username/password
   └─ Receives JWT token

2. CLIENT STORES TOKEN
   ├─ LocalStorage or SessionStorage
   └─ Sends in Authorization header

3. REQUEST TO PROTECTED ENDPOINT
   Header: Authorization: Bearer eyJhbGc...

4. FASTAPI EXTRACTS TOKEN
   ├─ Gets "Authorization" header
   ├─ Removes "Bearer " prefix
   └─ Token = "eyJhbGc..."

5. TOKEN VERIFICATION
   ├─ Decode using public key: jwt.decode(token, PUBLIC_KEY)
   ├─ Verify signature matches
   ├─ Check expiration
   └─ Extract payload claims

6. EXTRACT USER ID
   ├─ Look for "sub", "id", or "user_id" field
   ├─ Attach to request as "user" object
   └─ Available in route handler

7. PROCEED WITH REQUEST
   └─ User is authenticated
```

### Cryptographic Details

**RS256 Algorithm** (RSA with SHA256):
```
- Uses Public/Private key pair
- Private key: Signs token (kept secret on auth server)
- Public key: Verifies token (can be public)
- Flow:
  1. Auth server signs with private key → token
  2. API gets public key
  3. API verifies token using public key
  4. Cannot forge token without private key
```

**Token Payload Example**:
```json
{
  "sub": "user123",           // Subject (user ID)
  "email": "user@example.com",
  "role": "patient",
  "iat": 1672531200,         // Issued at
  "exp": 1672617600          // Expiration
}
```

### Security Best Practices Implemented

1. **JWT Verification**: All protected endpoints verify token signature
2. **User Isolation**: Users can only access their own data
3. **HTTPException**: Proper error responses without leaking details
4. **Public Key Validation**: Configured path to public key

---

## 10. Key Components Explained

### A. Configuration Module (`app/config/settings.py`)

```python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "cgm_trace_db"
    PORT: int = 8000
    JWT_PUBLIC_KEY_PATH: str = "./keys/public.pem"
    JWT_ALGO: str = "RS256"
```

**How It Works**:
1. `BaseSettings` reads from `.env` file
2. Type hints ensure type safety
3. Default values provided
4. Environment variables override defaults

**Usage in Code**:
```python
from app.config.settings import settings
# Access: settings.MONGO_URI, settings.PORT
```

**Equivalent in Node.js**:
```javascript
require('dotenv').config();
const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017",
  PORT: parseInt(process.env.PORT) || 8000
};
```

---

### B. Database Connection (`app/config/db.py`)

```python
# Create async MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

# Create indexes on startup
async def ensure_indexes():
    await db["glucose"].create_index([("user_id", 1), ("timestamp", -1)])
    await db["users"].create_index("email", unique=True)

def startup_indexes(loop=None):
    if loop is None:
        loop = asyncio.get_event_loop()
    loop.create_task(ensure_indexes())
```

**Why Motor (Async Driver)?**
- Without Motor: Database queries block entire application
- With Motor: Queries run in parallel, other users unaffected
- Performance: Can handle thousands of concurrent users

**Startup Flow**:
```
1. FastAPI starts
2. @app.on_event("startup") called
3. startup_indexes() executed
4. Creates database indexes
5. Application ready to serve requests
```

---

### C. Pydantic Schemas (Data Validation)

```python
# app/schemas/glucose_schema.py
from pydantic import BaseModel
from datetime import datetime

class GlucosePoint(BaseModel):
    timestamp: datetime
    glucose_value: float

class GlucoseBulkIn(BaseModel):
    user_id: str
    points: List[GlucosePoint]
```

**Validation Benefits**:
```python
# Valid request (auto-parses):
{
  "user_id": "123",
  "points": [
    {"timestamp": "2024-01-01T08:00:00", "glucose_value": 120}
  ]
}
# ✓ Types converted, datetime parsed, validated

# Invalid request (auto-rejected):
{
  "user_id": "123",
  "points": [
    {"timestamp": "invalid", "glucose_value": "abc"}
  ]
}
# ✗ HTTP 422 - Validation Error (automatic response)
```

**Equivalent in Node.js**:
```javascript
// Using Zod for validation
const GlucosePoint = z.object({
  timestamp: z.coerce.date(),
  glucose_value: z.number()
});

const GlucoseBulkIn = z.object({
  user_id: z.string(),
  points: z.array(GlucosePoint)
});
```

---

### D. CSV Parser (`app/utils/csv_parser.py`)

```python
async def parse_csv_bytes(file_bytes: bytes, start=None, end=None):
    def _sync_parse():
        # Decode bytes to string
        s = file_bytes.decode("utf-8", errors="replace")
        
        # Read CSV
        df = pd.read_csv(StringIO(s))
        
        # Normalize columns (handle different CSV formats)
        df = _normalize_columns(df)
        
        # Filter by date range if provided
        if start:
            df = df[df[DEFAULT_TIME_COL] >= pd.to_datetime(start)]
        if end:
            df = df[df[DEFAULT_TIME_COL] <= pd.to_datetime(end)]
        
        return df
    
    # Run sync code in thread pool (non-blocking)
    return await asyncio.to_thread(_sync_parse)
```

**Features**:
1. **Async Wrapper**: CPU-heavy parsing doesn't block I/O
2. **Column Normalization**: Handles various CSV formats
   - "DisplayDtTm" or "Date" or "Time"
   - "Glucose Value" or "BG" or "BloodGlucose"
3. **Data Cleaning**: Removes invalid rows
4. **Date Filtering**: Extracts date range from CSVs

**Process**:
```
File Upload → Decode → Parse CSV → Normalize Columns
  ↓
Parse Dates → Convert to Numbers → Drop Invalid Rows
  ↓
Filter Date Range → Return DataFrame
```

---

### E. JWT Security (`app/utils/jwt_security.py`)

```python
# Dependency injection for route protection
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    
    # Verify JWT signature
    payload = verify_jwt_token(token)
    
    # Extract user ID from standard claims
    user_id = payload.get("sub") or payload.get("id")
    
    # Return user object attached to request
    return {"id": user_id, **payload}

# Usage in routes
@router.get("/me")
async def get_user(user=Depends(get_current_user)):
    # user = {"id": "123", "email": "...", ...}
    return user
```

**Dependency Injection Pattern**:
```python
# FastAPI automatically handles this chain:
1. Receives request with Authorization header
2. Calls get_current_user()
3. Verifies JWT token
4. If valid: Injects user object into route
5. If invalid: Returns HTTP 401 Unauthorized
```

**Equivalent in Node.js Express**:
```javascript
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  
  jwt.verify(token, publicKey, (err, payload) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = payload;
    next();
  });
};

app.get('/me', verifyJWT, (req, res) => {
  res.json(req.user);
});
```

---

### F. Service Layer (`app/services/glucose_service.py`)

```python
async def insert_glucose_bulk(user_id: str, points: List[Dict]):
    """
    Business logic for inserting multiple glucose readings.
    - Adds user_id and type information
    - Performs bulk insert for performance
    - Returns count of inserted documents
    """
    docs = []
    for p in points:
        docs.append({
            "user_id": user_id,
            "timestamp": p["timestamp"],
            "glucose_value": float(p["glucose_value"])
        })
    
    # Bulk insert (more efficient than individual inserts)
    result = await db["glucose"].insert_many(docs)
    
    return len(result.inserted_ids)

async def fetch_points(user_id, start=None, end=None, limit=2000):
    """
    Query glucose readings with flexible date filtering.
    """
    query = {"user_id": user_id}
    
    # Build MongoDB query dynamically
    if start and end:
        query["timestamp"] = {"$gte": start, "$lte": end}
    elif start:
        query["timestamp"] = {"$gte": start}
    elif end:
        query["timestamp"] = {"$lte": end}
    
    # Execute async query
    cursor = db["glucose"].find(query).sort("timestamp", 1).limit(limit)
    
    return await cursor.to_list(length=limit)
```

**Why Service Layer?**
- Separates business logic from API routes
- Reusable across multiple routes
- Easier to test independently
- Single responsibility principle

---

### G. Insights/Analytics (`app/services/insight_service.py`)

```python
async def compute_insights(user_id, start=None, end=None, 
                          lower_bound=70.0, upper_bound=180.0):
    """
    Calculate glucose statistics using MongoDB aggregation.
    """
    # Build aggregation pipeline
    pipeline = [
        # 1. Filter to user's data
        {"$match": {"user_id": user_id}},
        
        # 2. Select relevant fields
        {"$project": {"glucose_value": 1, "timestamp": 1}},
        
        # 3. Group and calculate stats
        {"$group": {
            "_id": None,
            "count": {"$sum": 1},
            "sum": {"$sum": "$glucose_value"},
            "min": {"$min": "$glucose_value"},
            "max": {"$max": "$glucose_value"}
        }}
    ]
    
    # Execute aggregation
    agg = await db["glucose"].aggregate(pipeline).to_list(length=1)
    
    if not agg:
        return {"total_points": 0}  # No data
    
    stats = agg[0]
    total = stats["count"]
    
    # Calculate insights
    avg = stats["sum"] / total if total > 0 else None
    
    # Count readings in range, highs, lows
    # (additional queries executed here)
```

**MongoDB Aggregation Benefits**:
- Server-side calculations (not in application)
- Efficient filtering and grouping
- Minimal data transfer
- Similar to SQL GROUP BY

---

### H. ML Service (`app/services/ml_service.py`)

```python
async def rule_based_predict(points: List[Dict], lookback: int = 6):
    """
    ML predictions based on trend analysis.
    """
    if not points or len(points) < lookback:
        return {"risk": "low", "score": 0.05}
    
    # Get last N readings
    vals = [float(p["glucose_value"]) for p in points[-lookback:]]
    
    # Calculate rate of change
    diffs = np.diff(vals)  # [20, -5, 10, -3, 15]
    avg_slope = float(np.mean(diffs))  # Average change per reading
    
    latest = vals[-1]
    
    # Rule-based logic
    if avg_slope < -2.0 and latest < 90:
        return {
            "risk": "high",
            "score": 0.9,
            "advice": "Rapid fall detected. Consider fast carbs."
        }
    
    if avg_slope > 2.0 and latest > 180:
        return {
            "risk": "high",
            "score": 0.85,
            "advice": "Rapid rise detected."
        }
    
    # ... more rules ...
    
    return {"risk": "low", "score": 0.1, "advice": "Stable readings."}
```

**How It Works**:
1. Extract recent glucose values
2. Calculate trend (positive = rising, negative = falling)
3. Apply medical rules
4. Generate risk assessment and advice

**Example**:
```
Readings: [110, 115, 120, 125, 130, 135]
Differences: [5, 5, 5, 5, 5]
Average slope: 5.0 (rising trend)
Latest: 135

Rule: avg_slope > 1.0 → "Rising glucose. Observe."
```

---

## 11. Setup & Running

### Prerequisites
```bash
# Python 3.10+
python --version

# MongoDB running locally or remote
# URI: mongodb://localhost:27017
```

### Installation

```bash
# 1. Create virtual environment
python -m venv .venv

# 2. Activate virtual environment
# Windows:
.\.venv\Scripts\Activate.ps1

# Mac/Linux:
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create .env file
# Copy template and fill in values
```

### .env File Example
```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=cgm_trace_db
PORT=8000
JWT_PUBLIC_KEY_PATH=./keys/public.pem
JWT_ALGO=RS256
```

### Running the Application

```bash
# Development mode (with auto-reload)
uvicorn main:app --reload --port 8000

# Production mode (no reload)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Access:
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs (Swagger UI)
# - Alt Docs: http://localhost:8000/redoc (ReDoc)
```

### Docker Deployment

```bash
# Build image
docker build -t cgm-trace-api .

# Run container
docker run -p 8000:8000 \
  -e MONGO_URI=mongodb://mongo:27017 \
  cgm-trace-api

# Using Docker Compose
docker-compose up -d
```

### Testing

```bash
# Run all tests
pytest

# Run specific test
pytest tests/test_glucose.py

# Run with coverage
pytest --cov=app tests/
```

---

## 12. Common Development Tasks

### Adding a New Endpoint

1. **Create route handler**:
   ```python
   # routes/new_routes.py
   from fastapi import APIRouter, Depends
   
   router = APIRouter()
   
   @router.get("/new-endpoint")
   async def new_handler(user=Depends(get_current_user)):
       return {"message": "Hello"}
   ```

2. **Register route in main.py**:
   ```python
   from app.routes.new_routes import router as new_router
   app.include_router(new_router, prefix="/new", tags=["New"])
   ```

### Adding Authentication to Route

```python
from app.utils.jwt_security import get_current_user

@router.get("/protected")
async def protected(user=Depends(get_current_user)):
    # user automatically injected if token valid
    return {"user_id": user["id"]}
```

### Adding Database Query

```python
from app.config.db import db

async def get_user_glucose(user_id: str):
    result = await db["glucose"].find_one({"user_id": user_id})
    return result
```

### Error Handling

```python
from fastapi import HTTPException

@router.get("/items/{item_id}")
async def get_item(item_id: str):
    if not item_id:
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    item = await db["items"].find_one({"_id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return item
```

---

## 13. Performance Considerations

### Indexing
- Glucose collection has compound index: `user_id + timestamp`
- Dramatically speeds up date range queries
- Users index on email for fast lookups

### Async Operations
- All I/O operations are async (non-blocking)
- Database queries don't block other users
- Can handle thousands of concurrent connections

### Bulk Operations
- CSV upload uses `insert_many()` not individual inserts
- Reduces database round trips
- ~10x faster for large datasets

### Aggregation Pipelines
- Statistics calculated server-side (MongoDB)
- Only summary returned to API
- More efficient than application-level calculations

---

## 14. Security Considerations

1. **Environment Variables**: Secrets in `.env` (never commit)
2. **JWT Verification**: All protected routes verify tokens
3. **User Isolation**: Each user only sees their own data
4. **Input Validation**: Pydantic validates all inputs
5. **Error Handling**: Doesn't expose internal errors to clients
6. **CORS**: Should be configured in production
7. **HTTPS**: Required in production (not HTTP)

---

## Summary

This project demonstrates a production-ready Python backend for healthcare data management. It combines:

- **Modern Framework** (FastAPI) for high performance
- **Async Operations** for scalability
- **Type Safety** (Pydantic) for reliability
- **Database Design** for efficient queries
- **Security** (JWT, user isolation)
- **Analytics** (aggregation pipelines, ML)
- **Clean Architecture** (routes, services, utilities)

The patterns used here apply to any backend project and follow industry best practices.

