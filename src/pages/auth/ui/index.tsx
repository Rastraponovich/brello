import { FormEventHandler } from "react";
import { Header } from "src/widgets/header";
import { selectors } from "..";
import { useUnit } from "effector-react";
import { actions } from "../model";

export const AuthPage = () => {
  const [value, setValue, isValid] = selectors.useEmailField();
  const onSubmit = useUnit(actions.submitted);

  return (
    <main className="grid h-screen grid-cols-1 md:grid-cols-2">
      <div className="order-last flex  flex-col px-4 md:order-first  md:px-0">
        <Header className="hidden  w-full pl-0 pr-0 md:flex" useUser={false} />
        <div className="mx-auto my-0 flex w-full max-w-[360px] grow flex-col  justify-center">
          <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
          <span className="mt-2 text-base font-normal text-gray-600">
            Start your 30-day free trial.
          </span>
          <form
            onSubmit={onSubmit}
            className=" mt-8 flex flex-col space-y-6"
            noValidate
          >
            <label className="flex flex-col">
              <span className="text-sm text-gray-700 first-letter:uppercase">
                email
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                value={value}
                onChange={setValue}
                required
                className="mt-1.5 gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base font-normal shadow-sm placeholder:text-gray-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500  "
              />
              {!isValid && (
                <span className="mt-2  text-sm text-red-500 ">
                  Please enter a valid email address
                </span>
              )}
            </label>
            <div className="col-start-1 flex flex-col space-y-4 text-base font-semibold md:col-start-2">
              <button
                type="submit"
                disabled={!isValid}
                className="gap-2 rounded-lg bg-blue-600 py-2.5 text-white shadow-sm first-letter:uppercase disabled:pointer-events-none disabled:opacity-30"
              >
                get started
              </button>
              <button
                type="button"
                disabled={!isValid}
                className="gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-600 first-letter:uppercase disabled:pointer-events-none disabled:opacity-30"
              >
                sign up with Google
              </button>
            </div>
          </form>
        </div>
        <div className="grow"></div>
        <div className="flex justify-between px-8 py-8 text-sm font-normal text-gray-400">
          <span>© Brello 2023</span>
          <span>help@brello.io</span>
        </div>
      </div>
      <div className="order-first flex flex-col md:order-last ">
        <img
          src="/images/geometric-shapes.svg"
          className="hidden h-full md:block"
          alt="shapes"
        />
        <img
          src="/images/geometric-shapes-small.svg"
          className=" h-full md:hidden"
          alt="shapes"
        />
      </div>
    </main>
  );
};

export const AuthOnboarding = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };
  return (
    <main className="flex h-screen w-full flex-col">
      <section className="mx-auto my-0 flex h-screen flex-col bg-cells-pattern bg-center bg-no-repeat  px-4 pt-[300px]	md:max-w-[512px]">
        <h2 className="text-4xl font-semibold text-gray-900">
          Please, introduce yourself
        </h2>
        <p className="mt-4 text-lg font-normal text-gray-600 md:mt-5">
          You can do this later on Profile page.{" "}
          <a href="/" className="font-medium text-blue-700">
            Skip
          </a>
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <label
            htmlFor=""
            className="flex flex-col space-y-1.5 text-sm text-gray-700"
          >
            <span className="first-letter:uppercase">first name</span>
            <input
              type="text"
              placeholder="first name"
              className="gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-base font-normal shadow-sm placeholder:text-gray-300 placeholder:first-letter:uppercase"
            />
          </label>

          <label
            htmlFor=""
            className="flex flex-col space-y-1.5 text-sm text-gray-700"
          >
            <span className="first-letter:uppercase">last name</span>
            <input
              type="text"
              placeholder="last name"
              className="mt-8 gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-base font-normal shadow-sm placeholder:text-gray-300 placeholder:first-letter:uppercase"
            />
          </label>

          <button
            type="submit"
            className="col-span-2 rounded-lg bg-blue-600 py-3 text-center text-base font-semibold text-white first-letter:uppercase"
          >
            continue
          </button>
        </form>
      </section>
    </main>
  );
};
