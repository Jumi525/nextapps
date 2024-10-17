import SideBar from "@/components/sidebar/sideBar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: any;
};

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <main className="flex overflow-hidden h-screen w-screen">
      <SideBar params={params} />
      <div className="dark:border-neutral-12/70 border-l-[1px] w-full relative overflow-x-auto overflow-y-scroll">
        {children}
      </div>
    </main>
  );
};

export default Layout;
