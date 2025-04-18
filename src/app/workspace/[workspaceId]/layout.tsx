"use client";
import { Toolbar } from "./toolbar";

interface WorkspaceLayoutPageProps {
  children: React.ReactNode;
}
const WorkspaceLayoutPage = ({ children }: WorkspaceLayoutPageProps) => {
  return (
    <div className="w-full">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkspaceLayoutPage;
