"use client";
import Image from "next/image";
import Link from "next/link";
import DarkandLightButton from "./components/DarkandLightButton";
import SearchandButton from "./components/SearchandButton";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaTwitter } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useQuery } from "react-query";
import dateFormte from "dateformat";
import { useState } from "react";

type GitHubUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: null | string;
  created_at: string;
  email: null | string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: null | string;
  type: string;
  updated_at: string;
  url: string;
  documentation_url: string;
  message: string;
};

export default function Home() {
  const [username, setUserName] = useState("sachidumaleesha");

  const { isLoading, error, data, refetch } = useQuery<GitHubUser>({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    refetch();
  }

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen w-full bg-slate-100 p-1.5 sm:p-4 pt-10 sm:pt-12 transition dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8 rounded p-2">
        <section className="flex justify-between gap-3">
          <p className="text-xl font-semibold">devfinder</p>
          <DarkandLightButton />
        </section>

        {/* search and main */}
        <section className="flex flex-col gap-5">
          <SearchandButton
            onChange={(e) => setUserName(e.target.value)}
            onSubmit={handleSubmit}
            value={username}
          />

          {data?.message ? (
            <div className=" flex  w-full  flex-col gap-5 rounded-lg  bg-white px-4 py-8 text-center text-red-400 dark:bg-slate-800">
              User Not Found
            </div>
          ) : (
            <main className="flex w-full flex-col gap-5 rounded-lg bg-white dark:bg-slate-800 px-4 py-8 min-h-[200px]">
              <section className="flex gap-4">
                {/* user image */}
                <Image
                  src={data?.avatar_url ?? ""}
                  alt="github-profle-picture"
                  width={200}
                  height={200}
                  className="h-20 w-20 rounded-full"
                />

                <section className="flex flex-col justify-between gap-1 transition-all sm:w-full sm:flex-row">
                  <div>
                    {/* name */}
                    <h1>{data?.name}</h1>

                    {/* user id */}
                    <Link
                      target="_blank"
                      className="text-blue-500 hover:underline text-sm transition-all"
                      href={`https://github.com/users/${data?.login}`}
                    >
                      {data?.login}
                    </Link>
                  </div>

                  {/* joined data */}
                  <p>
                    <span>Joined</span>
                    <span> {dateFormte(data?.created_at, "dd mmm yyyy")}</span>
                  </p>
                </section>
              </section>

              <section className="flex flex-col gap-5">
                <p>
                  {data?.bio ?? (
                    <span className="opacity-60">This profile has no bio</span>
                  )}
                </p>

                {/* repo and followers */}
                <div className="flex justify-between gap-3 rounded-lg bg-stone-100 px-6 py-4 dark:bg-slate-900 min-h-[50px]">
                  {/* item 01 */}
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-xs opacity-60">Repo</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.public_repos}
                    </p>
                  </div>

                  {/* item 02 */}
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-xs opacity-60">Followers</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.followers}
                    </p>
                  </div>

                  {/* item 03 */}
                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-xs opacity-60">Following</p>
                    <p className="text-sm font-bold sm:text-base">
                      {data?.following}
                    </p>
                  </div>
                </div>

                {/* address and extra links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* item 01 */}
                  <div className="flex gap-2 items-center">
                    {/* icon */}
                    <IoLocationOutline className="text-xl" />
                    <p>
                      {data?.location ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>

                  {/* item 02 */}
                  <div className="flex gap-2 items-center">
                    {/* icon */}
                    <IoIosLink className="text-xl" />
                    {data?.blog ? (
                      <Link
                        target="_blank"
                        title={data?.blog}
                        href={data?.blog ?? "#"}
                        className="hover:underline text-ellipsis overflow-hidden max-w-[200px]"
                      >
                        {data?.blog}
                      </Link>
                    ) : (
                      <span className="opacity-60">Not Available</span>
                    )}
                  </div>

                  {/* item 03 */}
                  <div className="flex gap-2 items-center">
                    {/* icon */}
                    <FaTwitter className="text-xl" />
                    <p>
                      {data?.twitter_username ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>

                  {/* item 04 */}
                  <div className="flex gap-2 items-center">
                    {/* icon */}
                    <BsFillBuildingsFill className="text-xl" />
                    <p>
                      {data?.company ?? (
                        <span className="opacity-60">Not Available</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </main>
          )}
        </section>
      </div>
    </div>
  );
}
