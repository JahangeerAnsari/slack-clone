"use client";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
interface WorkspaceLayoutPageProps {
  children: React.ReactNode;
}
const WorkspaceLayoutPage = ({ children }: WorkspaceLayoutPageProps) => {
  return (
    <div className="w-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSave="ansarri-workspaces"
        >
          <ResizablePanel defaultSize={15} minSize={7} className="bg-[#5E2C5F]">
             <WorkspaceSidebar/>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayoutPage;
