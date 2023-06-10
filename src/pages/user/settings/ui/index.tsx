import { FormEventHandler, ReactElement } from "react";
import { Header } from "src/widgets/header";

/**
 * User Settings Page
 * @returns {ReactElement}
 */
export const UserPage = (): ReactElement => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Header />
      <main className="flex flex-col px-4 py-8 md:px-[112px]">
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile settings
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 md:mt-5 md:flex-row md:items-center md:space-x-6 md:space-y-0 md:border-t md:border-gray-300 md:pt-8"
        >
          <h3 className="hidden pr-3 md:inline">name</h3>
          <label className="flex flex-col">
            <span className=" text-sm text-gray-700 first-letter:uppercase md:hidden">
              first name
            </span>
            <input
              type="text"
              placeholder="first name"
              className="gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-300 placeholder:text-gray-300"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-700 first-letter:uppercase md:hidden">
              last name
            </span>
            <input
              type="text"
              placeholder="last name"
              className="gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-300 placeholder:text-gray-300"
            />
          </label>
        </form>
        <div className="mt-5 flex flex-col border-y border-gray-200 pb-6 pt-5 text-sm text-gray-700">
          <h3 className=" first-letter:uppercase">your photo</h3>
          <p className="font-normal text-gray-600">
            This will be displayed on your profile.
          </p>

          <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 text-gray-200">
            X
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end space-x-3">
          <button
            type="button"
            className="gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-center text-black shadow-sm first-letter:uppercase"
          >
            cancel
          </button>
          <button
            type="submit"
            className="gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 text-center text-white shadow-sm first-letter:uppercase"
          >
            save
          </button>
        </div>
      </main>
    </>
  );
};
