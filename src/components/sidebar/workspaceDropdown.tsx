"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { workspace } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./selectedWorkspace";
import CustomDialogTrigger from "../global/customDialogTrigger";
import WorkspaceCreator from "../global/workspaceCreator";

type WorkspaceDropDownProps = {
  privateWorkspaces: workspace[] | [];
  sharedWorkspaces: workspace[] | [];
  collaboratingWorkspaces: workspace[] | [];
  defaultValues: workspace | undefined;
};

const WorkspaceDropDown = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultValues,
}: WorkspaceDropDownProps) => {
  const [selectedOption, setSelectedOptions] = useState(defaultValues);
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch, state } = useAppState();

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACE",
        payload: {
          workpaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workpaces) => ({ ...workpaces, folders: [] })),
        },
      });
    }
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);

  const handleSelect = (option: workspace) => {
    setSelectedOptions(option);
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            "Select a workspace"
          )}
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group-[1] overflow-auto border-[1px] border-muted">
          <div className="rounded-md flex flex-col !p-2">
            {!!privateWorkspaces.length && (
              <>
                <p className="text-muted-foreground">Private</p>
                <hr />
                {privateWorkspaces.map((option) => (
                  <SelectedWorkspace
                    key={option.id}
                    workspace={option}
                    onClick={handleSelect}
                  />
                ))}
              </>
            )}
            {!!sharedWorkspaces.length && (
              <>
                <p className="text-muted-foreground">Shared</p>
                <hr />
                {sharedWorkspaces.map((option) => (
                  <SelectedWorkspace
                    key={option.id}
                    workspace={option}
                    onClick={handleSelect}
                  />
                ))}
              </>
            )}
            {!!collaboratingWorkspaces.length && (
              <>
                <p className="text-muted-foreground">Collaboration</p>
                <hr />
                {collaboratingWorkspaces.map((option) => (
                  <SelectedWorkspace
                    key={option.id}
                    workspace={option}
                    onClick={handleSelect}
                  />
                ))}
              </>
            )}
            <CustomDialogTrigger
              header="Create A Workspace "
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to callborate with others. you can change your workspace privacy settings after creating the workspace too."
            >
              <div className="flex  rounded-md transition-all hover:bg-muted justify-start items-center gap-2 p-2 w-full">
                <article className="text-slate-500 rounded-full bg-slate-500/50 w-4 h-4 flex items-center justify-center">
                  +
                </article>
                Create workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropDown;
