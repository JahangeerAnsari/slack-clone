import Quill, { Delta, Op, type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { ImageIcon, SendHorizontal, Smile, XIcon } from "lucide-react";
import { ALargeSmall } from "lucide-react";
import Hint from "./hint";
import { cn } from "@/lib/utils";
import { EmojiPopOver } from "./emoji-popover";
import Image from "next/image";
type EditValue = {
  image: File | null;
  body: string;
};
interface EditorProps {
  onSubmit: ({ body, image }: EditValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  defaultValue?: Delta | Op[];
  variant?: "create" | "update";
}
const Editor = ({
  variant,
  onSubmit,
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
  placeholder = "Write something...",
}: EditorProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isToolbarVisible, isSetToolbarVisible] = useState(true);
  const [chosenEmoji, setChosenEmoji] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLInputElement>(null);
  // we cannot directy add the props inside the useEffect it
  // will cause the re-redring issue so we conver into the ref
  // ref doent not crate re-rending
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  // HERE NO NEED TO PASS []
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "strike"],
          ["link", "image"],
          [{ list: "orders" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                // we war submit form at enter key
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    //  editor focus seted!
    quillRef.current.focus();
    if (innerRef) {
      innerRef.current = quill;
    }
    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    // refresh on every text stork change
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);
  const toggleToolbar = () => {
    isSetToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };
  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
  console.log("isEmpty===>", { isEmpty, text });
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
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(event: any) => setImage(event.target.files![0])}
        className="hidden"
      />
      <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 transition bg-white">
        <div ref={containerRef} className="h-full ql-custom" />
        {image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <Hint label="Remove image">
                <button
                  onClick={() => {
                    setImage(null);
                    imageElementRef.current!.value = "";
                  }}
                  className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute
            -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center
            "
                >
                  <XIcon className="size-3.5" />
                </button>
              </Hint>
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={isToolbarVisible ? "hide formatting" : "show formatting"}
          >
            <Button
              disabled={disabled}
              size="sm"
              variant="ghost"
              onClick={toggleToolbar}
            >
              <ALargeSmall className="size-4" />
            </Button>
          </Hint>
          <EmojiPopOver onEmojiSelect={onEmojiSelect}>
            <Button disabled={disabled} size="sm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopOver>
          {variant === "create" && (
            <Hint label="Add image or files(docs)">
              <Button
                disabled={disabled}
                size="sm"
                variant="ghost"
                onClick={() => imageElementRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button size="sm" variant="outline" onClick={() => {}}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={disabled || isEmpty}
                onClick={() => {}}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}

          {variant === "create" && (
            <Button
              disabled={disabled}
              onClick={() => {}}
              className={cn(
                "ml-auto",
                isEmpty
                  ? "bg-gray-100 hover:bg-gray-300 text-muted-foreground"
                  : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              )}
            >
              <SendHorizontal className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {variant === "create" && (
        <div
          className={cn(
            "p-2 text-[10px] text-muted-foreground flex justify-end",
            !isEmpty && "opacity-100"
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
