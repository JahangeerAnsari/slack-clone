import { cva, VariantProps } from "class-variance-authority";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsertemVariants = cva(
  "flex item-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface UserDetailProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof UsertemVariants>["variant"];
}

export const UserDetail = ({ id, image, label, variant }: UserDetailProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label?.charAt(0).toLocaleUpperCase();

  return (
    <Button
      variant="transparent"
      className={cn(UsertemVariants({ variant: variant }))}
      size="sm"
      asChild
    >
      <Link
        href={`/workspace/${workspaceId}/member/${id}`}
        className="flex items-center"
      >
        <Avatar className="size-5 rounded-md mr-1 bg-blue-500">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md text-white bg-blue-700">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
