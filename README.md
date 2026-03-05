# Smart Travel Booking Platform - Playwright Testing Sample

This project is a modern, full-stack web application designed to demonstrate automated testing features using **Playwright**. It features a "Smart Travel Booking Platform" where users can browse hotels, rent vehicles, and manage their bookings.

## 🚀 Features

### 💻 Frontend
- **React + TypeScript + Vite**
- **Tailwind CSS** for modern styling
- **Framer Motion** for premium animations
- **Responsive Design** (Desktop & Mobile)
- **Toast Notifications** for user feedback

### ⚙️ Backend
- **Node.js + Express**
- **MongoDB** integration
- **JWT Authentication**
- **RESTful API** for Users, Hotels, and Vehicles

### 🧪 Automated Testing (Playwright)
- **E2E Tests**: Full flow of registration, login, and booking.
- **API Mocking**: Intercepting network requests to test UI states (success/error).
- **Custom Fixtures**: Reusable login logic for authenticated tests.
- **BDD Style**: Test descriptions follow "Given / When / Then" structure.
- **Reporting**: Generates HTML reports with screenshots on failure.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017/smart-travel`) or update `.env`

### Installation
1. Install all dependencies:
   ```bash
   npm run install:all
   ```

### Running the App
1. Start both Client and Server in development mode:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

### Running Tests
1. Execute all Playwright tests:
   ```bash
   npx playwright test
   ```
2. Open the HTML test report:
   ```bash
   npx playwright show-report
   ```

---

## 🚀 CI/CD Pipeline

This project includes a **GitHub Actions** workflow for automated CI/CD.

### Features:
- **Automated Testing**: Runs Playwright E2E tests on every push and pull request.
- **Dependency Management**: Installs and caches dependencies for faster builds.
- **Linting**: Checks the code quality of the frontend.
- **Build Verification**: Ensures the client application builds successfully.
- **Database Integration**: Uses a MongoDB service container for testing the backend.
- **Artifacts**: Uploads Playwright test reports (with screenshots/videos on failure) for easy debugging.

The workflow configuration can be found in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## 📂 Project Structure
```text
├── client/          # React Frontend
├── server/          # Express Backend
├── tests/           # Playwright Test Suite
│   ├── fixtures.ts  # Custom test fixtures
│   ├── login.test.ts
│   ├── booking.test.ts
│   ├── api-mock.test.ts
│   └── ui-validation.test.ts
├── playwright.config.ts
└── package.json     # Root scripts
```

## 🎯 UI Selectors for Testing
All key elements use `data-testid` for reliable selection:
- `auth-email-input`, `auth-password-input`
- `auth-submit-btn`, `auth-title`
- `hotel-grid`, `hotel-card-{id}`
- `book-hotel-btn-{index}`
- `booking-modal`, `confirm-booking-btn`
- `dashboard-bookings-list`
