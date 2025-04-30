import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";
import {cva, type VariantProps} from 'class-variance-authority'
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
const SidebarItemVariants = cva(
    "flex item-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",{
        variants:{
            variant:{
                default:"text-[#f9edffcc]",
                active:"text-[#481349] bg-white/90 hover:bg-white/90"
            }
        },
        defaultVariants:{
            variant:"default"
        }
    }
)

interface SidebarItemProps{
    label:string;
    icon:IconType;
    id:string;
    variant?:VariantProps<typeof SidebarItemVariants>["variant"]
}
export const SidebarItem = ({icon:Icon, id,label,variant}:SidebarItemProps) =>{
    const workspaceId = useWorkspaceId()
    return (
        <Button asChild
         className={cn(SidebarItemVariants({variant:variant}))}
        variant="transparent" size="sm">
            <Link href={`/workspace/${workspaceId}/channel/${id}`}>
            <Icon className="size-3.5 mr-1 shrink-0"/>
            <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    )
}