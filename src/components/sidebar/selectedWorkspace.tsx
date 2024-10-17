"use client";
import { workspace } from "@/lib/supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SelectedWorkspaceProps = {
  workspace: workspace;
  onClick?: (option: workspace) => void;
};

const SelectedWorkspace = ({ onClick, workspace }: SelectedWorkspaceProps) => {
  const supabase = createClientComponentClient();
  const [workpaceLogo, setWorkspaceLogo] = useState("/cypresslogo.svg");
  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from("workspace-logos")
        .getPublicUrl(workspace.logo)?.data.publicUrl;
      setWorkspaceLogo(path);
    }
  }, [workspace]);

  return (
    <Link
      href={`/dashboard/${workspace.id}`}
      onClick={() => {
        if (onClick) onClick(workspace);
      }}
      className="flex rounded-md hover:bg-muted transition-all flex-row p-2 gap-4 justify-center cursor-pointer items-center my-2"
    >
      <Image
        src={workpaceLogo}
        alt="workspace-logo"
        width={26}
        height={26}
        objectFit="cover"
      />
      <div className="text-lg w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap ">
        {workspace.title}
      </div>
    </Link>
  );
};

export default SelectedWorkspace;
