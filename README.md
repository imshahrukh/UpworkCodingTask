# Construction Tasks Management App

A modern, responsive web application for managing construction tasks with interactive floor plans, built with React, TypeScript, RxDB, and Tailwind CSS. Features comprehensive Yup validation for all forms and components.

![Construction Tasks App](./docs/screenshot.png)

## 🚀 Features

- **Interactive Floor Plan**: Click on floor plans to place and manage tasks
- **Real-time Task Management**: Create, edit, and track construction tasks
- **Comprehensive Validation**: All forms use Yup validation schemas
- **Offline Support**: Works offline with RxDB and IndexedDB
- **Responsive Design**: Beautiful UI that works on all devices
- **Task Status Tracking**: Visual indicators for task progress and blocked items
- **User Management**: Simple login/registration system
- **Modern UI**: Built with Tailwind CSS and modern design principles

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Database**: RxDB with IndexedDB storage
- **State Management**: Zustand with persistence
- **Routing**: React Router DOM 7
- **Validation**: Yup with Formik
- **Styling**: Tailwind CSS 4
- **Build Tool**: Create React App
- **Containerization**: Docker & Docker Compose

## 📋 Project Structure

```
construction-tasks-app/
├── Dockerfile                 # Production Docker configuration
├── Dockerfile.dev            # Development Docker configuration
├── docker-compose.yml        # Docker Compose setup
├── nginx.conf                # Nginx configuration for production
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── src/
│   ├── index.tsx             # Application entry point
│   ├── App.tsx               # Main App component
│   ├── App.css               # Global styles and Tailwind imports
│   ├── db/                   # Database layer
│   │   ├── schema.ts         # RxDB schemas and types
│   │   └── db.ts             # Database operations and setup
│   ├── store/                # State management
│   │   ├── userStore.ts      # User state with Zustand
│   │   └── taskStore.ts      # Task state with Zustand
│   ├── validation/           # Form validation schemas
│   │   └── schemas.ts        # Yup validation schemas
│   ├── components/           # React components
│   │   ├── Login.tsx         # Login/registration form
│   │   ├── PlanView.tsx      # Interactive floor plan view
│   │   ├── TaskBoard.tsx     # Task list and management
│   │   └── TaskForm.tsx      # Task editing form
│   └── routes/               # Routing configuration
│       └── Router.tsx        # Route definitions and protection
├── public/                   # Static assets
│   ├── index.html           # HTML template
│   ├── manifest.json        # PWA manifest
│   └── assets/              # Static assets
│       └── floor-plan.svg   # Sample floor plan
└── README.md                # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd construction-tasks-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Docker Development

1. **Run with Docker Compose**
   ```bash
   docker-compose --profile dev up --build
   ```

2. **Access the app**
   Navigate to `http://localhost:3001`

### Production Deployment

1. **Build and run with Docker**
   ```bash
   docker-compose up --build
   ```

2. **Access the app**
   Navigate to `http://localhost:3000`

## 📝 Form Validation with Yup

This application extensively uses Yup validation schemas for all forms:

### User Login Validation
```typescript
const userLoginSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
});
```

### Task Form Validation
```typescript
const taskFormSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Task title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters')
    .nullable(),
  checklist: yup
    .array()
    .of(checklistItemSchema)
    .min(1, 'At least one checklist item is required')
    .max(20, 'Maximum 20 checklist items allowed'),
});
```

### Checklist Item Validation
```typescript
const checklistItemSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required('Checklist item text is required')
    .min(1, 'Text must not be empty')
    .max(200, 'Text must not exceed 200 characters'),
  status: yup
    .string()
    .oneOf(['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'FINAL_CHECK_AWAITING', 'DONE'])
    .required('Status is required'),
});
```

## 🎯 Usage Guide

### Getting Started

1. **Login/Register**: Enter your name to create an account or login
2. **Floor Plan View**: The main interface showing your construction floor plan
3. **Create Tasks**: Enter a task title and click anywhere on the floor plan
4. **Manage Tasks**: Click on task markers to edit details and checklists
5. **Task Board**: View all tasks in a list format with filtering options

### Task Management

- **Task Status**: Visual indicators show progress (Not Started, In Progress, Nearly Done, Complete, Blocked)
- **Checklist Items**: Each task contains a detailed checklist with status tracking
- **Validation**: All forms include comprehensive validation with helpful error messages
- **Offline Support**: Works completely offline - data persists locally

### Navigation

- **Floor Plan** (`/plan`): Interactive floor plan view
- **Task Board** (`/tasks`): List view of all tasks
- **Task Editor** (`/task/:id`): Detailed task editing interface
- **Login** (`/login`): User authentication

## 🔒 Data Management

### Database Schema

The app uses RxDB with the following collections:

#### Users Collection
```typescript
{
  id: string;
  name: string;
  createdAt: string;
}
```

#### Tasks Collection
```typescript
{
  id: string;
  userId: string;
  title: string;
  description?: string;
  position?: { x: number; y: number };
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
}
```

#### Checklist Items
```typescript
{
  id: string;
  text: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'BLOCKED' | 'FINAL_CHECK_AWAITING' | 'DONE';
  createdAt: string;
  updatedAt: string;
}
```

### Data Isolation

- Tasks are filtered by `userId` ensuring user data separation
- All operations include user context validation
- Local storage persists user sessions

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface inspired by Figma
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, transitions, and visual feedback
- **Status Indicators**: Color-coded task status with icons
- **Loading States**: Smooth loading indicators for all async operations
- **Error Handling**: User-friendly error messages and recovery options

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🐳 Docker Commands

```bash
# Development
docker-compose --profile dev up --build

# Production
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f construction-tasks-app
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The build folder contains the optimized production build.

### Environment Variables

No environment variables are required for basic functionality. The app works entirely client-side with local storage.

## 🔍 Validation Features

### Form-Level Validation
- Real-time validation as users type
- Field-level error messages
- Form submission prevention until valid
- Custom validation rules for each field type

### Data Validation
- Schema validation at the database level
- Type safety with TypeScript
- Runtime validation for all user inputs
- Sanitization of user-provided data

### Error Handling
- Graceful error recovery
- User-friendly error messages
- Validation feedback with specific guidance
- Network error handling for offline scenarios

## 📱 Offline Support

- **Full Offline Functionality**: App works without internet connection
- **Local Data Persistence**: All data stored locally with IndexedDB
- **Sync-Free Operation**: No server dependencies for core functionality
- **Progressive Web App**: Can be installed on devices

## 🎯 Key Features Showcase

### Interactive Floor Plan
- Click-to-place task functionality
- Visual task markers with status colors
- Hover tooltips showing task details
- Responsive floor plan scaling

### Advanced Task Management
- Comprehensive checklist system
- Status tracking with visual indicators
- Bulk operations and filtering
- Real-time updates across views

### Form Validation Excellence
- Yup schema validation throughout
- Formik integration for smooth UX
- Field-level and form-level validation
- Custom validation rules and messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the validation schemas in `/src/validation/schemas.ts`

---

**Built with ❤️ for construction professionals who need reliable task management tools.**
