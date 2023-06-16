import { FormEventHandler } from "react";
import { selectors } from "..";
import { useUnit } from "effector-react";
import { actions } from "../model";
import { Logo } from "src/shared/ui/icons/logo";
import { SocialButton } from "src/shared/ui/button";

export const AuthPage = () => {
  const [value, setValue, isValid] = selectors.useEmailField();
  const onSubmit = useUnit(actions.submitted);

  return (
    <main className="flex h-screen flex-col sm:flex-row">
      <div className="order-last flex w-full flex-col sm:order-first sm:max-w-[50%] sm:px-0">
        <Logo className="mb-6 mt-8 w-full px-4 sm:my-8 sm:px-8" />
        <div className="mx-auto my-0 flex w-full max-w-[360px] grow flex-col justify-center  px-4 sm:px-0">
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
                value={value as string}
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

              <SocialButton authService="google" textAlign="center" />
            </div>
          </form>
        </div>
        <div className="hidden justify-between px-8 py-8 text-sm font-normal text-gray-400 sm:flex">
          <span>&copy; Brello 2023</span>
          <a href="mailto:help@brello.io">help@brello.io</a>
        </div>
      </div>
      <div className="order-first flex w-full max-w-[50%] flex-col items-center sm:order-last">
        <SmallPattern />
        <LargePattern />
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

const SmallPattern = () => {
  return (
    <svg
      width="375"
      height="63"
      viewBox="0 0 375 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sm:hidden"
    >
      <rect width="62.5" height="62.5" fill="white" />
      <rect x="31.3109" y="31.25" width="31.25" height="31.25" fill="#2970FF" />
      <rect width="31.25" height="31.25" fill="#B2DDFF" />
      <rect
        width="62.5"
        height="62.5"
        transform="translate(62.5)"
        fill="#B2DDFF"
      />
      <path d="M125 0V62.5H62.5L125 0Z" fill="#004EEB" />
      <circle cx="93.6891" cy="31.25" r="15.625" fill="white" />
      <rect
        width="62.5"
        height="62.5"
        transform="translate(125)"
        fill="white"
      />
      <path d="M156.311 31.25H187.561L156.311 62.5V31.25Z" fill="#2970FF" />
      <path d="M156.25 0V31.25H125L156.25 0Z" fill="#2970FF" />
      <rect
        width="62.5"
        height="62.5"
        transform="translate(187.5)"
        fill="white"
      />
      <path
        d="M250 62.5C232.741 62.5 218.75 48.5089 218.75 31.25C218.75 13.9911 232.741 0 250 0V62.5Z"
        fill="#004EEB"
      />
      <circle cx="203.125" cy="31.25" r="15.625" fill="#84ADFF" />
      <rect
        width="62.5"
        height="62.5"
        transform="translate(250)"
        fill="#B2DDFF"
      />
      <path d="M281.25 31.25L281.25 0L312.5 31.25L281.25 31.25Z" fill="white" />
      <path d="M250 31.25L281.25 31.25L281.25 62.5L250 31.25Z" fill="#2970FF" />
      <rect
        width="62.5"
        height="62.5"
        transform="translate(312.5)"
        fill="#84ADFF"
      />
      <path
        d="M312.5 62.5C329.759 62.5 343.75 48.5089 343.75 31.25C343.75 13.9911 329.759 0 312.5 0V62.5Z"
        fill="#004EEB"
      />
      <path
        d="M375 -1.36598e-06L375 62.5L343.75 31.25L375 -1.36598e-06Z"
        fill="white"
      />
    </svg>
  );
};

const LargePattern = () => {
  return (
    <svg
      width="768"
      height="960"
      viewBox="0 0 768 960"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden sm:block"
    >
      <rect
        width="192"
        height="192"
        transform="translate(576)"
        fill="#84ADFF"
      />
      <path d="M576 96H672C672 149.019 629.019 192 576 192V96Z" fill="white" />
      <path d="M672 0C725.019 0 768 42.9807 768 96H672V0Z" fill="#004EEB" />
      <rect
        width="192"
        height="192"
        transform="translate(0 768)"
        fill="white"
      />
      <path d="M0 864H96C96 917.019 53.0193 960 0 960V864Z" fill="#2970FF" />
      <path
        d="M96 768L96 864C42.9807 864 -2.31755e-06 821.019 0 768L96 768Z"
        fill="#004EEB"
      />
      <path
        d="M96 864C96 810.981 138.981 768 192 768L192 864L96 864Z"
        fill="#2970FF"
      />
      <path
        d="M96 864C149.019 864 192 906.981 192 960H96V864Z"
        fill="#84ADFF"
      />
      <rect
        width="192"
        height="192"
        transform="translate(576 192)"
        fill="#B2DDFF"
      />
      <path
        d="M672 288H768C768 341.019 725.019 384 672 384V288Z"
        fill="#2970FF"
      />
      <path
        d="M672 288C618.981 288 576 330.981 576 384H672V288Z"
        fill="#004EEB"
      />
      <rect
        width="192"
        height="192"
        transform="translate(192 192)"
        fill="white"
      />
      <path
        d="M384 288H288C288 341.019 330.981 384 384 384V288Z"
        fill="#2970FF"
      />
      <path
        d="M288 192C341.019 192 384 234.981 384 288H288V192Z"
        fill="#004EEB"
      />
      <rect width="192" height="192" transform="translate(384)" fill="white" />
      <path d="M480 96H576L480 192V96Z" fill="#2970FF" />
      <path d="M480 0V96H384L480 0Z" fill="#2970FF" />
      <rect
        width="192"
        height="192"
        transform="translate(384 384)"
        fill="#B2DDFF"
      />
      <path d="M480 480L480 384L576 480L480 480Z" fill="white" />
      <path d="M384 480L480 480L480 576L384 480Z" fill="#2970FF" />
      <rect
        width="192"
        height="192"
        transform="translate(384 192)"
        fill="#84ADFF"
      />
      <path
        d="M480 384C426.981 384 384 341.019 384 288C384 234.981 426.981 192 480 192V384Z"
        fill="#004EEB"
      />
      <circle cx="480" cy="288" r="48" fill="white" />
      <rect
        width="192"
        height="192"
        transform="translate(192 768)"
        fill="#84ADFF"
      />
      <path
        d="M288 960C234.981 960 192 917.019 192 864C192 810.981 234.981 768 288 768V960Z"
        fill="#004EEB"
      />
      <path
        d="M384 960C330.981 960 288 917.019 288 864C288 810.981 330.981 768 384 768V960Z"
        fill="white"
      />
      <circle cx="288" cy="864" r="48" fill="#2970FF" />
      <rect
        width="192"
        height="192"
        transform="translate(0 576)"
        fill="#B2DDFF"
      />
      <path
        d="M-4.19629e-06 672C-1.87874e-06 618.981 42.9807 576 96 576C149.019 576 192 618.981 192 672L-4.19629e-06 672Z"
        fill="#2970FF"
      />
      <circle cx="96" cy="720" r="48" fill="white" />
      <rect
        width="192"
        height="192"
        transform="translate(192 576)"
        fill="white"
      />
      <path
        d="M192 672C192 618.981 234.981 576 288 576C341.019 576 384 618.981 384 672L192 672Z"
        fill="#2970FF"
      />
      <path
        d="M288 768C234.981 768 192 725.019 192 672C192 618.981 234.981 576 288 576V768Z"
        fill="#004EEB"
      />
      <circle cx="336" cy="720" r="48" fill="#84ADFF" />
      <rect
        width="192"
        height="192"
        transform="translate(0 384)"
        fill="white"
      />
      <path
        d="M192 576C138.981 576 96 533.019 96 480C96 426.981 138.981 384 192 384V576Z"
        fill="#004EEB"
      />
      <circle cx="48" cy="480" r="48" fill="#84ADFF" />
      <rect
        width="192"
        height="192"
        transform="translate(192 384)"
        fill="#84ADFF"
      />
      <path
        d="M192 576C245.019 576 288 533.019 288 480C288 426.981 245.019 384 192 384V576Z"
        fill="#004EEB"
      />
      <path d="M384 384L384 576L288 480L384 384Z" fill="white" />
      <rect width="192" height="192" fill="white" />
      <rect x="96" y="96" width="96" height="96" fill="#2970FF" />
      <rect width="96" height="96" fill="#B2DDFF" />
      <rect
        width="192"
        height="192"
        transform="translate(384 576)"
        fill="#B2DDFF"
      />
      <rect x="384" y="576" width="96" height="96" fill="#004EEB" />
      <rect x="480" y="672" width="96" height="96" fill="white" />
      <rect
        width="192"
        height="192"
        transform="translate(0 192)"
        fill="#B2DDFF"
      />
      <circle cx="96" cy="288" r="48" fill="white" />
      <path d="M192 384H0L96 288L192 384Z" fill="#004EEB" />
      <rect
        width="192"
        height="192"
        transform="translate(576 768)"
        fill="white"
      />
      <circle cx="720" cy="912" r="48" fill="#2970FF" />
      <circle cx="624" cy="912" r="48" fill="#2970FF" />
      <path d="M576 768L768 768L672 864L576 768Z" fill="#004EEB" />
      <rect
        width="192"
        height="192"
        transform="translate(576 576)"
        fill="white"
      />
      <circle cx="672" cy="672" r="48" fill="#EFF4FF" />
      <path d="M768 768H576L672 672L768 768Z" fill="#004EEB" />
      <path d="M768 672H576L672 576L768 672Z" fill="#84ADFF" />
      <rect
        width="192"
        height="192"
        transform="translate(192)"
        fill="#84ADFF"
      />
      <path d="M384 0V192H192L384 0Z" fill="#004EEB" />
      <circle cx="288" cy="96" r="48" fill="white" />
      <rect
        width="192"
        height="192"
        transform="translate(576 384)"
        fill="white"
      />
      <path d="M576 384L768 384L768 576L576 384Z" fill="#2970FF" />
      <circle cx="672" cy="480" r="48" fill="#004EEB" />
      <rect
        width="192"
        height="192"
        transform="translate(384 768)"
        fill="#D1E9FF"
      />
      <path d="M576 960H384L384 768L576 960Z" fill="#84ADFF" />
      <circle cx="480" cy="864" r="48" fill="white" />
    </svg>
  );
};
