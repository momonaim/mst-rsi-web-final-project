# Master RSI Backend

This is the backend API service for the Master RSI (Réseaux et Systèmes d'Information) student management system. Built with Laravel, this application provides a robust API for managing student data and related images.

## Project Overview

This backend system is designed to manage student data and associated images for the Master RSI program. It provides RESTful API endpoints for:

-   Student management (CRUD operations)
-   Image handling and storage
-   User authentication and authorization

## Technology Stack

-   **Framework**: Laravel
-   **Database**: SQLite
-   **API Documentation**: OpenAPI/Swagger (l5-swagger)
-   **Authentication**: Laravel Sanctum

## Project Structure

Key components of the application:

-   `app/Models/`: Contains the data models (Etudiant, Image, User)
-   `app/Http/Controllers/`: API controllers
-   `app/Schemas/`: OpenAPI/Swagger schemas
-   `database/migrations/`: Database structure and changes
-   `routes/api.php`: API route definitions

## Getting Started

### Prerequisites

-   PHP >= 8.0
-   Composer
-   SQLite

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd master-rsi-backend
```

2. Install dependencies:

```bash
composer install
```

3. Set up environment:

```bash
cp .env.example .env
php artisan key:generate
```

4. Run migrations:

```bash
php artisan migrate
```

5. Start the development server:

```bash
php artisan serve
```

## API Documentation

The API documentation is auto-generated using l5-swagger. After installation, you can access the documentation at:

```
http://localhost:8000/api/documentation
```

## License

This project is proprietary software. All rights reserved.

## Contributing

Please contact the project maintainers for information about contributing to this project.opensource.org/licenses/MIT).
