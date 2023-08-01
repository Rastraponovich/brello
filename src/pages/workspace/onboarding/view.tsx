import { useUnit } from "effector-react";

import {
  $url,
  $name,
  urlChanged,
  nameChanged,
  $description,
  formSubmitted,
  descriptionChanged,
} from "./model";

import { Button } from "shared/ui/button";
import { OnboardingLayout } from "widgets/layout";
import { Input, InputArea, InputWeb } from "shared/ui/input";

export const OnboardingPage = () => {
  const [description, name, url] = useUnit([$description, $name, $url]);
  const [
    handleChangeName,
    handleChangeUrl,
    handleChangeDescription,
    handleSubmit,
  ] = useUnit([nameChanged, urlChanged, descriptionChanged, formSubmitted]);

  return (
    <OnboardingLayout
      icon="common/folder-shield"
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
          id="form"
          onSubmit={handleSubmit}
          className=" flex w-full flex-col gap-6 sm:max-w-[512px]"
        >
          <Input
            caption="Workspace name"
            placeholder="Your Company Co."
            value={name ?? undefined}
            onChange={handleChangeName}
          />

          <InputWeb
            rightPlaceholder="your-company-co"
            leftPlaceholder="brello.io/workspaces/"
            rightValue={url ?? undefined}
            onChange={handleChangeUrl}
          />
          <InputArea
            caption="Description"
            placeholder="Our team organizes everything here."
            value={description ?? undefined}
            onChange={handleChangeDescription}
          />
        </form>
        <Button type="submit" size="lg" form="form" variant="primary">
          Get started
        </Button>
      </div>
    </OnboardingLayout>
  );
};
