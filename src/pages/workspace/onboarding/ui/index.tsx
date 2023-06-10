import { FormEventHandler } from "react";
import { Header } from "src/widgets/header";

export const OnboardingPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <main className=" flex w-full flex-col items-center px-4 md:p-0">
        <form onSubmit={handleSubmit} className="flex max-w-[512px] flex-col ">
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            Let's build a Workspace
          </h1>
          <p className="mt-4 text-lg font-normal text-gray-600 md:mt-5 md:text-xl">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
          <label htmlFor="" className="mt-12 flex flex-col">
            <span className="text-sm text-gray-700">Workspace name</span>
            <input
              type="text"
              placeholder="Your Company Co."
              className="mt-1.5 gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 shadow-sm"
            />
          </label>

          <label htmlFor="" className="mt-6 flex flex-col">
            <span className="text-sm text-gray-700">Description</span>
            <textarea
              placeholder="Our team organizes everything here."
              className="mt-1.5 resize-none gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 shadow-sm"
              rows={5}
            />
          </label>

          <button
            type="submit"
            className="mt-8 gap-2 rounded-lg border border-blue-600 bg-blue-600 px-5 py-3 text-center text-white shadow-sm first-letter:uppercase"
          >
            get started
          </button>
        </form>
      </main>
    </>
  );
};
