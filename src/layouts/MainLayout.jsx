import { Outlet } from "react-router-dom";

import ThemeToggle from "../components/theme/ThemeToggle";

function MainLayout() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      <ThemeToggle />

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;