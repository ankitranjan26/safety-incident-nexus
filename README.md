
# AI Safety Incident Dashboard

A modern, interactive dashboard for monitoring and reporting AI safety incidents. Built with React, TypeScript, and Three.js for immersive 3D visualizations.

## 🛠 Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Notifications**: Sonner Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ai-safety-incident-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🎨 Design Decisions & Challenges

### Design Philosophy
- **Immersive Experience**: Incorporated 3D animations using Three.js to create an engaging user interface that visualizes AI safety concepts.
- **Responsive Design**: Built with a mobile-first approach using Tailwind CSS for consistent responsiveness across devices.
- **Theme Support**: Implemented dark/light mode theming for better accessibility and user preference.

### Technical Challenges & Solutions
1. **3D Performance**: Optimized Three.js scenes by:
   - Using instanced meshes for particle systems
   - Implementing proper disposal of 3D objects
   - Carefully managing animation frame updates

2. **Form Validation**: 
   - Implemented robust form validation for incident reporting
   - Used toast notifications for user feedback
   - Maintained a smooth user experience with animated transitions

3. **State Management**:
   - Utilized React Query for efficient data fetching and caching
   - Implemented proper error boundaries and loading states
   - Maintained consistent state across theme changes

## 📝 License

This project is MIT licensed.

