# Student Management System — Frontend

A web-based Student Management System frontend built with **Next.js, TypeScript, Tailwind CSS, and React**.

The application provides an administrative interface for viewing, adding, editing, and deleting student records. It includes a dashboard-style student directory with statistics, pagination, search-friendly states, form validation, and API integration.

## Features

* View student records in a responsive directory
* Dashboard with student statistics
* Add new students
* View individual student details
* Edit existing student records
* Delete students
* Pagination for student records
* Loading, empty, and error states
* Retry handling when API requests fail
* Form validation
* Responsive dashboard interface
* Reusable React components
* API communication through a dedicated API utility

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Lucide React** for icons
* **Zod** for validation
* **Next.js App Router**

## Project Structure

```text
my-app/
├── app/
│   ├── components/
│   │   ├── DashboardHeader.tsx
│   │   ├── DeleteStudentButton.tsx
│   │   ├── StatsCard.tsx
│   │   ├── StudentDirectory.tsx
│   │   ├── StudentDirectoryHeader.tsx
│   │   ├── StudentForm.tsx
│   │   ├── StudentPagination.tsx
│   │   ├── StudentStates.tsx
│   │   ├── StudentStats.tsx
│   │   └── StudentTable.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   └── student-schema.ts
│   │
│   ├── students/
│   │   ├── new/
│   │   │   └── page.tsx
│   │   │
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── edit/
│   │           └── page.tsx
│   │
│   ├── types/
│   │   └── students.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

## Main Pages

### Dashboard

```text
/
```

The main dashboard displays the student directory and summary statistics.

### Add Student

```text
/students/new
```

Form used to create a new student record.

### Student Details

```text
/students/[id]
```

Displays information for an individual student.

### Edit Student

```text
/students/[id]/edit
```

Allows an existing student record to be updated.

## Components

The frontend is divided into reusable components to keep the pages easier to maintain.

### `DashboardHeader`

Displays the application heading and the primary action for adding a student.

### `StudentDirectory`

Handles the main student directory area and coordinates the table, pagination, and UI states.

### `StudentDirectoryHeader`

Contains the directory heading and related controls.

### `StudentTable`

Displays students in a structured table with:

* Student name
* Email
* Student ID
* Department
* Program
* View action

### `StudentStats`

Displays summary information about the student records.

### `StatsCard`

Reusable card component used to display an individual statistic.

### `StudentPagination`

Handles navigation between pages of student records.

### `StudentStates`

Contains reusable UI states for:

* Loading
* Errors
* Empty results

### `StudentForm`

Form used for creating and updating student records.

### `DeleteStudentButton`

Handles deletion of a student record.

## API Layer

API-related functionality is kept in:

```text
app/lib/api.ts
```

Keeping API requests in a dedicated file avoids placing network logic directly inside UI components.

The API layer is responsible for operations such as:

```text
GET     /students
GET     /students/:id
POST    /students
PUT     /students/:id
DELETE  /students/:id
```



## Validation

Student form validation is defined in:

```text
app/lib/student-schema.ts
```

The project uses **Zod** to validate student input before submitting data to the API.

This helps prevent invalid or incomplete data from being sent to the backend.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SK-B99/Frontend.git
```

### 2. Navigate into the project

```bash
cd Frontend
cd "Student Management System/frontend/my-app"
```

Adjust the path depending on where the repository is cloned on your machine.

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

For example:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Replace the URL with the address of the Student Management System backend.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm start
```

Starts the application using the production build.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

## Error Handling

The frontend includes dedicated states for common request conditions.

### Loading

Displayed while student records are being retrieved.

### Empty

Displayed when no students are available or when a search produces no results.

### Error

Displayed when the API request fails.

Users can retry the request without refreshing the entire page.

## UI Design

The interface uses a simple administrative dashboard layout with:

* Neutral colors
* Compact statistics cards
* Responsive student table
* Clear typography
* Minimal borders and shadows
* Reusable action buttons
* Consistent spacing

The goal is to keep the interface practical and easy to use rather than overly decorative.

## Development Workflow

Changes are managed through Git.

Example workflow:

```bash
git add .
git commit -m "your commit message"
git push
```

Recent development includes improvements to the student directory components and error handling.


Possible future improvements include:

* Authentication and role-based access
* Advanced student search and filtering
* Department and program filters
* Sorting columns
* Bulk student actions
* Export students to CSV/Excel
* Toast notifications
* Confirmation dialogs
* Improved mobile table experience
* Dashboard charts and reporting
* Automated frontend tests

## License

This project is currently intended for educational and development purposes.


