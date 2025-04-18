import UserButton from "@/features/auth/components/user-button"
import { WorkspaceSwither } from "./workspace-swither"
import { SidebarButton } from "./sidebar-button"
import { Bell, Home, MessageSquare, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export const Sidebar = () => {
    // dynamically active 
    const pathname = usePathname()
    return (
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
            <WorkspaceSwither/>
            <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")}/>
            <SidebarButton icon={MessageSquare} label="Dms" />
            <SidebarButton icon={Bell} label="Notification" />
            <SidebarButton icon={Settings} label="Settings" />
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    )
}