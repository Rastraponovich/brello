import { FormEventHandler } from "react";
import { Button } from "src/shared/ui/button";
import { FeaturedIcon } from "src/shared/ui/icons/featured-icon/ui";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";

export const OnboardingPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <main className=" flex h-screen w-full flex-col items-center bg-geometric-square bg-[center_-390px] bg-no-repeat px-4 sm:bg-[center_-280px] md:p-0">
      <section className="mt-16 flex max-w-[512px] grow flex-col sm:mt-[111px]">
        <FeaturedIcon icon="shield-folder" />
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Let's build a Workspace
        </h1>
        <p className="mt-4 text-lg font-normal text-gray-600 md:mt-5 md:text-xl">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-12 flex max-w-[512px] flex-col space-y-6"
        >
          <Input caption="Workspace name" placeholder="Your Company Co." />
          <InputWeb
            leftPlaceholder="brello.io/workspaces/"
            rightPlaceholder="your-company-co"
          />
          <InputArea
            caption="Description"
            placeholder="Our team organizes everything here."
          />

          <Button
            type="submit"
            size="lg"
            className="border border-blue-600 bg-blue-600 px-5 py-3  text-white "
          >
            Get started
          </Button>
        </form>
      </section>
    </main>
  );
};
