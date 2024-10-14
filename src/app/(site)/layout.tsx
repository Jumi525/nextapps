import Header from "@/components/landing-page/header";
import React from "react";

type homePageProps = {
  children: React.ReactNode;
};

const HomePageLayout = ({ children }: homePageProps) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
