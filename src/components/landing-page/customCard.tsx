import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
type CustomCardProps = CardProps & {
  cardHeader?: React.ReactNode;
  cardContent?: React.ReactNode;
  cardFooter?: React.ReactNode;
};

const CustomCard = ({
  className,
  cardHeader,
  cardContent,
  cardFooter,
  ...Props
}: CustomCardProps) => {
  return (
    <Card className={cn("w-[300px]", className)} {...Props}>
      <CardHeader>{cardHeader}</CardHeader>
      <CardContent className="gap-4">{cardContent}</CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
};

export default CustomCard;
