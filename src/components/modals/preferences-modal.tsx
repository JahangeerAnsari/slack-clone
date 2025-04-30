import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import EditWorkspacesModal from "./edit-workspaces-modal";
import { Id } from "../../../convex/_generated/dataModel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirmation";
interface PreferrencesModalProps {
  initialValue: string;

}
export const PreferrencesModal = ({ initialValue }: PreferrencesModalProps) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const [value, setValue] = useState(initialValue);
  const { isOpen, onClose, type,onOpen } = useStoreModal();
  const isModalOpen = isOpen && type === "preferences";
  const {mutate:workspaceDelete , isPending:isDeleteWorkspace} = useDeleteWorkspace();
  const [ConfirmDialog,confirm] =useConfirm("Are you Sure?", "This action is irreversible")
  const handleClosePreferenceModal = () => {
    onClose();
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const handleDeleteWorkspace = async () =>{
    const okay = await confirm()
     if(!okay) return
    workspaceDelete({
     id:workspaceId
    },{
      onSuccess:() =>{
        handleClosePreferenceModal()
        toast.success("Workspace deleted!");
        router.replace("/")
      },
      onError:()=>{
        toast.error("Failed to delete workspace")
      }
    })
  }
  return (
    <>
    <ConfirmDialog/>
    <EditWorkspacesModal value={value}/>
    <Dialog open={isModalOpen} onOpenChange={handleClosePreferenceModal}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden ">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog>
            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace name</p>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold" onClick={() =>onOpen("editWorkspace")}>
                Edit
              </p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
            </Dialog>
          <button
            disabled={isDeleteWorkspace}
            onClick={handleDeleteWorkspace}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50  text-rose-600"
          >
            <TrashIcon className="size-4"/>
            <p className="text-sm font-semibold">Delete workspace</p>
           
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
   
  );
};
