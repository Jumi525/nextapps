import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropDown from "./workspaceDropdown";

type SideBarProps = {
  params: { workspaceId: string };
  className?: string;
};

const SideBar = async ({ params, className }: SideBarProps) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return "";

  const { data: subscriptionData, error: subcriptionError } =
    await getUserSubscriptionStatus(user.id);
  const { data: workspaceFolderData, error: folderError } = await getFolders(
    params.workspaceId
  );
  if (subcriptionError || folderError) redirect("/dashboard");
  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm: flex-col w-[280px] shrink-0 p-4 gap-4 md:gap-4 !justify-between",
        className
      )}
    >
      <div>
        <WorkspaceDropDown
          defaultValues={[
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].find((workspaces) => workspaces.id === params.workspaceId)}
          privateWorkspaces={privateWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
        />
      </div>
    </aside>
  );
};

export default SideBar;
