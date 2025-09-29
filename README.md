# Construction Tasks Management App

A modern, offline-first web application for managing construction tasks with interactive floor plans. Built with React, TypeScript, RxDB, and Tailwind CSS.

## 🚀 Features

- **Interactive Floor Plan**: Click anywhere on the floor plan to place tasks
- **Task Management**: Create, edit, delete tasks with full CRUD operations
- **Checklist System**: Add/edit/delete checklist items with 5 status types
- **Task Board**: Filter and sort tasks by status, date, or title
- **User Authentication**: Simple name-based login with automatic user creation
- **Offline-First**: Works completely offline with RxDB and IndexedDB
- **Real-time Updates**: Tasks sync instantly between plan and list views
- **Status Tracking**: Visual progress indicators and statistics

## 🏗️ Tech Stack

- **React 19** with TypeScript (strict mode)
- **RxDB** for offline-first database
- **Zustand** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Yup + Formik** for form validation

## ⏱️ Development Time & Effort

This project represents a comprehensive development effort with detailed time tracking:

### Time Breakdown by Phase
- **Project Setup & Architecture**: 3 hours
  - Initial project setup with React 19 + TypeScript
  - Database schema design and RxDB configuration
  - State management architecture with Zustand
- **Database & State Management**: 4 hours
  - RxDB implementation with IndexedDB storage
  - User and task collections setup
  - Offline-first data persistence
- **Authentication System**: 1 hour
  - Simple name-based login system
  - User creation and data isolation
- **Floor Plan & Task Placement**: 6 hours
  - Interactive SVG floor plan implementation
  - Click-to-place task functionality
  - Task positioning and visualization
- **Task Management (CRUD)**: 3 hours
  - Complete task lifecycle management
  - Real-time updates and synchronization
- **Checklist System**: 3 hours
  - 5-status checklist implementation
  - Add/edit/delete checklist items
  - Status-based task filtering
- **UI Components & Styling**: 5 hours
  - Custom component library with Tailwind CSS
  - Modern UI/UX implementation
- **Filtering & Sorting**: 2 hours
  - Advanced task filtering capabilities
  - Multiple sorting options
  - Search functionality
- **Constants Refactoring**: 3 hour
  - Code organization and maintainability
  - Centralized configuration management
- **Bug Fixes & Polish**: 3 hours
  - UI alignment and styling fixes
  - Performance optimizations
  - Final testing and refinement

### Summary
**Total Development Time**: ~33 hours

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm start
```

### Production Build
```bash
# Build for production
npm run build

# Serve with Docker
docker-compose up --build
```

## 📱 Usage

1. **Login**: Enter your name to create/login
2. **Create Tasks**: Enter task title and click on floor plan to place
3. **Manage Tasks**: Click task markers to edit details and checklist
4. **Track Progress**: Use sidebar to filter, sort, and monitor tasks
5. **Offline**: App works completely offline - data persists locally

## 🎯 Key Features Implemented

### ✅ Authentication
- Name-only login system
- Automatic user creation
- Data isolation by user

### ✅ Task Management
- Interactive floor plan with click-to-place
- Full CRUD operations
- Task positioning and visualization
- Real-time updates

### ✅ Checklist System
- Default checklist items for new tasks
- 5 status types: Not Started, In Progress, Blocked, Final Check Awaiting, Done
- Add/edit/delete checklist items
- Status-based task filtering

### ✅ Task Board
- Visual task list with filtering
- Status statistics (Total, Blocked, Active, Done)
- Sort by date, title, or status
- Search and filter functionality

### ✅ Offline-First
- RxDB with IndexedDB storage
- Complete offline functionality
- Data persistence across sessions
- No external API dependencies

## 🔧 Architecture Highlights

- **Constants Organization**: Centralized constants for maintainability
- **Custom Hooks**: Reusable logic (`useTaskOperations`, `useTaskFiltering`)
- **Type Safety**: Full TypeScript implementation with strict mode
- **Component Architecture**: Well-structured, reusable components
- **Error Handling**: Comprehensive error states and user feedback

## 📝 What I'd Improve Given More Time

1. **Error Boundaries**: Implement React error boundaries for better error handling
2. **Testing**: Add comprehensive unit and integration tests
3. **Performance**: Implement virtual scrolling for large task lists
4. **Accessibility**: Add more ARIA attributes and keyboard shortcuts
5. **Mobile UX**: Optimize touch interactions for mobile devices
6. **Data Export**: Add ability to export tasks to PDF/Excel
7. **Collaboration**: Real-time multi-user editing capabilities
8. **Advanced Filtering**: More granular filter options
9. **Task Dependencies**: Add task relationship management

## 🎥 Demo Video

[Link to demo video explaining the code and functionality]
