import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { cn } from "@/lib/utils";

interface ReactionsProps{
  data: Array<
  Omit<Doc<"reactions">, "memberId"> & {
    count: number;
    memberIds: Id<"members">[];
  }
>;
    onChange:(value:string) => void;
}
export const Reactions=({
   data,onChange }:ReactionsProps)=>{

    const workspaceId = useWorkspaceId();
    const {data:currentMember}=useCurrentMember({workspaceId});
    const currentMemberId = currentMember?._id;
      if(data.length ===0 || !currentMemberId){
        return null
      }
    return (
        <div className="flex items-center gap-1 mt-1 mb-1">
            {data.map((reaction,index) => (
                <button key={index} onClick={()=> onChange(reaction.value)} className={cn("h-6 px-2 rounded-full bg-slate-200/70 border-transparent text-slate-80 flex items-center gap-x-1",
                    reaction.memberIds.includes(currentMemberId) && 
                    "bg-blue-100/70 border-blue-500 text-white"
                )}>
                    {reaction.value}
                    <span className={cn("text-xs font-semibold text-muted-foreground",
                        reaction.memberIds.includes(currentMemberId) &&
                        "text-blue-500"
                    )}>{reaction.count}</span>
                </button>
            ))}
        </div>
    )
}