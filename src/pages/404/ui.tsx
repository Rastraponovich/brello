import { useUnit } from "effector-react";

import { goBackButtonClicked, goHomeButtonClicked } from "./model";

import { Button } from "shared/ui/button";
import { Heading } from "shared/ui/heading";

export const NotFoundPage = () => {
  const [backButtonClicked, homeButtonClicked] = useUnit([
    goBackButtonClicked,
    goHomeButtonClicked,
  ]);
  return (
    <main className="container mx-auto my-0 flex h-full flex-col justify-center pt-16 md:pt-0">
      <section className="flex h-full flex-col gap-8 px-4 sm:gap-12 md:justify-center">
        <div className="flex flex-col gap-6 font-semibold">
          <a className="text-base text-blue-700">404 error</a>

          <Heading as="h1" className="text-4xl text-gray-900 md:text-6xl">
            We can’t find that page
          </Heading>
          <p className="text-lg font-normal text-gray-600 md:text-xl">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-3 font-semibold sm:flex-row-reverse sm:justify-end ">
          <Button onClick={homeButtonClicked} variant="primary" size="xl">
            Take me home
          </Button>
          <Button
            onClick={backButtonClicked}
            leftIcon="arrows/arrow-left"
            variant="secondaryGray"
            size="xl"
          >
            <span>Go back</span>
          </Button>
        </div>
      </section>
    </main>
  );
};
