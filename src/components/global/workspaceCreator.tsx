"use state";
import { useSupabaseUser } from "@/lib/providers/supabaseUserProvider";
import { User, workspace } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Lock, Plus, Share } from "lucide-react";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import { addCollaborator, createWorkspace } from "@/lib/supabase/queries";
import { useAppState } from "@/lib/providers/state-provider";
import CollaboratorSearch from "./collaboratorSearch";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const { dispatch } = useAppState();
  const router = useRouter();
  const [permission, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[] | []>([]);
  const addCollaborators = (user: User) => {
    setCollaborators([...collaborators, user]);
  };

  const removeCollaborators = (userId: string) => {
    setCollaborators((prev) =>
      prev.filter((collaborator) => collaborator.id !== userId)
    );
  };

  const createItem = async () => {
    const uuid = v4();
    if (user?.id) {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: "🧿",
        id: uuid,
        inTrash: "",
        logo: null,
        title,
        workspaceOwner: user.id,
        bannerUrl: "",
      };
      // trying on my own
      if (permission === "private") await createWorkspace(newWorkspace);
      dispatch({
        type: "NEW_WORKSPACE",
        payload: { workspace: newWorkspace },
      });
      if (permission === "shared") {
        await createWorkspace(newWorkspace);
        await addCollaborator(collaborators, uuid);
        dispatch({
          type: "NEW_WORKSPACE",
          payload: { workspace: newWorkspace },
        });
      }
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-muted-foreground text-sm">
          Name
        </label>
        <div className="flex justify-center items-center gap-2">
          <Input
            name="name"
            placeholder="workspace name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <>
        <Label htmlFor="permissions" className="text-sm text-muted-foreground">
          Permission
        </Label>
        <Select
          defaultValue={permission}
          onValueChange={(val) => setPermissions(val)}
        >
          <SelectTrigger className="w-full h-24 -mt-3">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div className="p-2 flex gap-4 items-center justify-center">
                  <Lock />
                  <article className="text-left flex flex-col">
                    <span>Private</span>
                    <p>
                      Your workspace is private to you. You can choose to share
                      it later
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="p-2 flex gap-4 items-center justify-center">
                  <Share />
                  <article className="text-left flex flex-col">
                    <span>Shared</span>
                    <p>Your can invite your collaborators</p>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>
      {permission === "shared" && (
        <div>
          <CollaboratorSearch
            existingCollaborators={collaborators}
            getCollaborator={(user) => addCollaborators(user)}
          >
            <Button type="button" className="text-sm mt-4">
              <Plus />
              Add collaborator
            </Button>
          </CollaboratorSearch>
        </div>
      )}
      <Button
        variant="secondary"
        type="button"
        disabled={
          !title || (permission === "shared" && collaborators.length === 0)
        }
        onClick={createItem}
      >
        Create
      </Button>
    </div>
  );
};

export default WorkspaceCreator;
