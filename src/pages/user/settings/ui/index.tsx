import { FormEventHandler, ReactElement } from "react";
import { Input } from "src/shared/ui/input";
import { Upload } from "src/shared/ui/upload";
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
      <main className="container mx-auto my-0 flex flex-col px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile settings
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 md:mt-5 md:flex-row md:items-center md:space-x-6 md:space-y-0 md:border-t md:border-gray-300 md:pt-8"
        >
          <h3 className="hidden w-full shrink-0 pr-3 sm:inline sm:max-w-[280px]">
            name
          </h3>
          <Input caption="First name" placeholder="First name" size="md" />
          <Input caption="Last name" placeholder="Last name" size="md" />
        </form>
        <section className="mt-5 flex w-full flex-col gap-5 border-y border-gray-200 pb-6 pt-5 text-sm text-gray-700 sm:flex-row sm:gap-8">
          <div className="flex w-full shrink-0 flex-col sm:max-w-[280px]">
            <h3 className="first-letter:uppercase">your photo</h3>
            <p className="font-normal text-gray-600">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="flex w-full flex-col gap-5 sm:flex-row">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 text-gray-200">
              X
            </div>
            <Upload />
          </div>
        </section>

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
