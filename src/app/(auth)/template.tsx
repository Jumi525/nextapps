import React from "react";

type TemplateProp = {
  children: React.ReactNode;
};

const Template = ({ children }: TemplateProp) => {
  return <div className="h-screen p-6 flex justify-center">{children}</div>;
};

export default Template;
