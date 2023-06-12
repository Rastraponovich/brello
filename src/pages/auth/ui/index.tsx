import { FormEventHandler } from "react";
import { Header } from "src/widgets/header";

export const AuthPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <div className="order-last flex w-full max-w-[360px] flex-col justify-center justify-self-center px-4 md:order-first  md:px-0">
        <Header className="hidden  w-full pl-0 pr-0 md:flex" useUser={false} />
        <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
        <span className="mt-2 text-base font-normal text-gray-600">
          Start your 30-day free trial.
        </span>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-6">
          <label className="flex flex-col">
            <span className="text-sm text-gray-700 first-letter:uppercase">
              email
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1.5 gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-base font-normal shadow-sm placeholder:text-gray-500"
            />
          </label>
          <div className="col-start-1 flex flex-col space-y-4 text-base font-semibold md:col-start-2">
            <button
              type="submit"
              className="gap-2 rounded-lg bg-blue-600 py-2.5 text-white shadow-sm first-letter:uppercase"
            >
              get started
            </button>
            <button
              type="button"
              className="gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-600 first-letter:uppercase"
            >
              sign up with Google
            </button>
          </div>
        </form>
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
