import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { Button } from "./ui/button";
import Hint from "./hint";
import { EmojiPopOver } from "./emoji-popover";
import { useRef, useState } from "react";
import Quill from "quill";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}
const Toolbar = ({
  handleDelete,
  handleEdit,
  handleReaction,
  handleThread,
  isAuthor,
  isPending,
  hideThreadButton,
}: ToolbarProps) => {
  const [chosenEmoji, setChosenEmoji] = useState<string | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const onEmojiSelect = (emoji: any) => {
    setChosenEmoji(emoji);

    const quill = quillRef.current;
    const selection = quill?.getSelection();

    if (selection) {
      quill?.insertText(selection.index, emoji);
    } else {
      // Fallback: insert at the end if no selection (e.g., first emoji)
      const length = quill?.getLength() || 0;
      quill?.insertText(length - 1, emoji);
    }
  };
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopOver hint="Add reaction" onEmojiSelect={(emoji) =>handleReaction(emoji)}>
          <Button variant="ghost" size="sm" disabled={isPending} 
         
          >
            <Smile className="size-4" />
          </Button>
        </EmojiPopOver>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button variant="ghost" size="sm" disabled={isPending}
            onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Edit Message">
            <Button
              variant="ghost"
              size="sm"
              disabled={isPending}
              onClick={handleEdit}
            >
              <Pencil className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Delete Message">
            <Button
              variant="ghost"
              size="sm"
              disabled={isPending}
              onClick={handleDelete}
            >
              <Trash className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
