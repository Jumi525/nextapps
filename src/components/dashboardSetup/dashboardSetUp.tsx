"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthUser } from "@supabase/supabase-js";
import EmojiPicker from "../global/emojiPicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldValues, useForm } from "react-hook-form";

type DashboardSetupProps = {
  user: AuthUser;
  subscription: {} | null;
};

const DashboardSetUp = ({ user, subscription }: DashboardSetupProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: { logo: "", workspaceName: "" },
  });
  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle>Craete a workspace</CardTitle>
        <CardDescription>
          Let create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex-col flex gap-4">
            <div className="flex item-center gap-4">
              <div className="text-5xl">
                <EmojiPicker
                  getValue={(emoji) => {
                    setSelectedEmoji(emoji);
                  }}
                >
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="workpaceName"
                  type="text"
                  placeholder="workspace Name"
                  disabled={isLoading}
                  {...register("workspaceName", {
                    required: "workspace name is required",
                  })}
                />
                <small className="text-red-600">{errors.root?.message}</small>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetUp;
