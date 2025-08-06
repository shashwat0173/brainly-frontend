import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  if (!open) {
    return null;
  }

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );

    onClose();
  }

  return (
    <div>
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
        <div className="flex flex-col justify-center">
          <span className="bg-white opacity-100 p-4 rounded fixed">
            <div className="flex justify-end">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>
            <div>
              <Input reference={titleRef} placeholder="Title" />
              <Input reference={linkRef} placeholder="Link" />
            </div>
            <div>
              <h1>Type</h1>
              <div className="flex gap-1 justify-center pb-2">
                <Button
                  text="Youtube"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  text="Twitter"
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={addContent} variant="primary" text="Submit" />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
