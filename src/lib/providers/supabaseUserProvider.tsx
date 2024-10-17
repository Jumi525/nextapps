"use client";
import { AuthUser } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Subscription } from "../supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUserSubscriptionStatus } from "../supabase/queries";
import { useToast } from "@/components/ui/use-toast";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>(
  {} as SupabaseUserContextType
);

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

type SupabaseUserProvider = {
  children: React.ReactNode;
};

export const SupabaseUserProvider = ({ children }: SupabaseUserProvider) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { toast } = useToast();

  const supabase = createClientComponentClient();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // check this line later
      if (!user) return "";
      console.log(user);
      setUser(user);
      const { data, error } = await getUserSubscriptionStatus(user.id);
      if (data) setSubscription(data);
      if (error)
        toast({
          title: "Unexpected Error",
          description: "Oops Unexpected error happened, Try again later",
        });
    };
  }, [supabase, toast]);
  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
