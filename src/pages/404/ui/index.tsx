import { Heading } from "src/shared/ui/heading";
import { Icon } from "src/shared/ui/icon";

export const NotFoundPage = () => {
  return (
    <main className="mx-auto my-0 flex h-screen flex-col pt-16 md:pt-0">
      <section className="flex h-full flex-col space-y-8 px-4 md:justify-center md:px-[112px]">
        <div className="flex flex-col gap-6 font-semibold">
          <a className="text-base text-blue-700">404 error</a>

          <Heading as="h1" className="text-4xl text-gray-900 md:text-6xl">
            We can’t find that page
          </Heading>
          <p className="text-lg font-normal text-gray-600 md:text-xl">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-3 font-semibold md:flex-row-reverse md:justify-end ">
          <a
            href="/"
            className="rounded-lg border border-blue-600 bg-blue-600 py-3 text-center text-white md:px-3 md:py-4 md:text-lg"
          >
            Take me home
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-center text-gray-700 md:px-3 md:py-4 md:text-lg"
          >
            <Icon name="arrows/arrow-left" />
            <span>Go back</span>
          </a>
        </div>
      </section>
    </main>
  );
};
