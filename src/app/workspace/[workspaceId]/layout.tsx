"use client";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceLayoutPageProps {
  children: React.ReactNode;
}
const WorkspaceLayoutPage = ({ children }: WorkspaceLayoutPageProps) => {
  return (
    <div className="w-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar/>
      {children}
      </div>
      
     
    </div>
  );
};

export default WorkspaceLayoutPage;
