import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onSubmit: React.FormEventHandler<HTMLFormElement>
};

export default function SearchandButton(props: Props) {
  return (
    <form
      className="flex items-center gap-2 w-full shadow-mg focus-within:ring-2 focus-within:ring-gray-800 dark:focus-within:ring-gray-200 p-2 rounded-lg bg-white dark:bg-slate-800"
      onSubmit={props.onSubmit}
    >
      <section className="flex items-center w-full h-full gap-2">
        <IoSearch className="text-2xl text-blue-500" />
        <input
          value={props.value}
          onChange={props.onChange}
          type="text"
          className="w-full outline-none h-[40px] rounded bg-inherit px-1 text-sm"
          placeholder="Search Github Username"
        />
      </section>
      <button className="rounded-lg bg-blue-500 px-5 py-2 text-white hover:opacity-80">
        Search
      </button>
    </form>
  );
}
