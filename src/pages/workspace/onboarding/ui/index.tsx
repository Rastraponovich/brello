import { FormEventHandler } from "react";
import { Button } from "src/shared/ui/button";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";
import { OnboardingLayout } from "src/widgets/layout";

export const OnboardingPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <OnboardingLayout
      icon="shield-folder"
      backgroundImage="bg-geometric-square"
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Let's build a Workspace
        </h1>
        <p className="text-lg font-normal text-gray-600 md:text-xl">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <form
          onSubmit={handleSubmit}
          id="form"
          className="flex w-full flex-col gap-6 sm:max-w-[512px]"
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
        </form>
        <Button type="submit" size="lg" form="form" variant="primary">
          Get started
        </Button>
      </div>
    </OnboardingLayout>
  );
};
