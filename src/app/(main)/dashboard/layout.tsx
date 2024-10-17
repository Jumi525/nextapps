import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: any;
};

const Layout = ({ children }: LayoutProps) => {
  return <main className="h-screen flex overflow-hidden">{children}</main>;
};

export default Layout;
