"use client";
import TitleSection from "@/components/landing-page/titleSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import banner from "../../../public/appBanner.png";
import {
  CLIENTS,
  PRICING_CARDS,
  PRICING_PLANS,
  USERS,
} from "../../lib/constant";
import calender from "../../../public/cal.png";
import { randomInt, randomUUID } from "crypto";
import { cn } from "@/lib/utils";
import CustomCard from "@/components/landing-page/customCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import diamond from "../../../public/icons/diamond.svg";
import check from "../../../public/icons/check.svg";
import clsx from "clsx";

const HomePage = () => {
  return (
    <article className=" overflow-x-hidden relative px-4 py-6 sm:px-6 flex flex-col gap-10">
      <section className="flex flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          title="All-In-One Collaboration and Productivity Platform"
          pill="Your workspace, Perfected"
        />
        <div className="text-center md:mx-auto p-[3px] bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px] rounded-md">
          <Button variant="secondary" className="w-full py-1 dark:bg-black">
            Get Cypres Free
          </Button>
        </div>
        <figure className="relative">
          <Image src={banner} alt="application Banner" width={1024}></Image>
          <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-t z-10 dark:from-background"></div>
        </figure>
      </section>
      <section className="relative">
        <div
          className="overflow-hidden
        flex
        after:absolute
        after:content-none
        after:dark:from-brand-dark
        after:to-transparent
        after:from-background
        after:bg-gradient-to-l
        after:right-0
        after:bottom-0
        after:top-0
        after:w-20
        after:z-10

        before:absolute
        before:content-none
        before:dark:from-brand-dark
        before:to-transparent
        before:from-background
        before:bg-gradient-to-r
        before:left-0
        before:bottom-0
        before:top-0
        before:w-20
        before:z-10"
        >
          {[...Array(2)].map((arr) => (
            <div key={arr} className=" flex flex-nowrap">
              {CLIENTS?.map((client) => (
                <figure
                  key={client.alt}
                  className="animate-slide mx-20 flex items-center"
                >
                  <Image
                    alt={client.alt}
                    loading="lazy"
                    src={client.logo}
                    width={500}
                    className=" object-cover min-w-[150px]"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="relative gap-10 flex flex-col justify-center items-center">
        <div className="w-[30%] h-32 bg-brand-primaryPurple/50 blur-[120px] rounded-full absolute right-0 left-0 m-auto top-0 bottom-0" />
        <TitleSection
          pill="Features"
          title="Keep track of your meetings all in one place"
          subheading="Capture your ideas, thoughs and meeting notes in a structured and organized manner"
        />
        <div className="p-1 mx-11 bg-red-900 rounded-md overflow-hidden dark:bg-gradient-to-r dark:from-brand-primaryBlue dark: to-brand-primaryPurple">
          <Image src={calender} alt="calender" width={450} />
        </div>
        <div className="w-[30%] h-32 bg-brand-primaryPurple/50 blur-[120px] rounded-full absolute right-0 left-0 m-auto top-0 bottom-0" />
      </section>
      <section>
        <section className="relative gap-10 flex flex-col">
          <div className="w-[30%] h-32 bg-brand-primaryPurple/50 blur-[120px] rounded-full absolute right-0 left-0 m-auto top-0 bottom-0" />
          <TitleSection
            pill="Testimonial"
            title="Trusted by all"
            subheading="Join thousand of satisfied users who rely on our platform for their personnal and professional productivity needs"
          />
          {[...Array(2)].map((arr, index) => (
            <div
              key={arr}
              className={cn(
                "flex flex-nowrap my-0 gap-6 self-start",
                "hover:paused",
                {
                  "flex-row-reverse": index === 1,
                  "animate-[slide_250s_linear_infinite]": true,
                  "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                  "ml-[100vw]": index === 1,
                }
              )}
            >
              {USERS.map((user, index) => (
                <CustomCard
                  key={user.name}
                  className="w-[500px] shrink-0 rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background"
                  cardHeader={
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`/avatars/${index + 1}.png`}
                        ></AvatarImage>
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-foreground">
                        {user.name}
                      </CardTitle>
                      <CardDescription className="dark:text-washed-purple-800">
                        {user.name.toLowerCase()}
                      </CardDescription>
                    </div>
                  }
                  cardContent={
                    <p className="dark: text-washed-purple-800">
                      {user.message}
                    </p>
                  }
                />
              ))}
            </div>
          ))}
        </section>
      </section>
      <section className="px-4 sm:px-6 ">
        <TitleSection
          title="The Perfect Plan For You"
          pill="Pricing"
          subheading="Experience all the benefit of our platform, select a plan"
        />

        <div className=" mt-6 flex flex-col-reverse  sm:flex-row sm:items-stretch gap-4 justify-center items-center ">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              className={clsx(
                "w-[300px] rounded-2xl dark:bg-black/70 backdrop-blur-3xl relative",
                {
                  "border-brand-primaryPurple/870":
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              cardHeader={
                <CardTitle className="text-3xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div className="-z-10 hidden dark:block w-full blur-[120px] rounded-full h-full absolute bg-brand-primaryPurple/30 top-6 right-0" />
                      <Image
                        className="absolute top-6 right-6"
                        src={diamond}
                        alt="diamond"
                        width={23}
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0 ">
                  <span className=" font-normal text-2xl">
                    ${card.price}
                    {+card.price > 0 ? (
                      <span className="text-base dark:text-washed-purple-800 ml-1">
                        /mo
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                  <p className="my-2 dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Button
                    variant="secondary"
                    className=" whitespace-nowrap w-full mt-1"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get Started"}
                  </Button>
                </CardContent>
              }
              cardFooter={
                <ul className="font-normal flex flex-col mb-2 gap-4">
                  <small>{card.highlightFeature}</small>
                  {card.freatures.map((feature, index) => (
                    <li className="flex gap-2 items-center" key={index}>
                      <Image src={check} alt="check icon" />
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </section>
    </article>
  );
};

export default HomePage;
