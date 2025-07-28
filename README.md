# Laravel Project Setup

## Requirements

-   PHP 8.3
-   Composer
-   MySQL
-   Node.js 22
-   NPM (comes with Node.js)

## Setup Steps

1. Clone the repository and navigate into it:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install PHP dependencies:

```bash
composer install
```

3. Install Node.js dependencies:

```bash
npm install
```

4. Create `.env` file:

```bash
cp .env.example .env
```

5. Edit `.env` with your environment details, for example:

```env
APP_NAME=Project
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=project
DB_USERNAME=root
DB_PASSWORD=
```

6. Generate application key:

```bash
php artisan key:generate
```

7. Create a symbolic link from public/storage to storage/app/public

```bash
php artisan storage:link
```

8. Run migrations:

```bash
php artisan migrate
```

9.  Seed the database:

```bash
php artisan db:seed
```

10. Start the development server:

```bash
composer run dev
```

11. Visit the app in your browser at [http://localhost:8000](http://localhost:8000)

---
