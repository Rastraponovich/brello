import { useUnit } from "effector-react";

import { OnboardingLayout } from "~/layouts/onboarding-layout";

import { Button } from "~/shared/ui/button";
import { Input, InputArea, InputWeb } from "~/shared/ui/input";

import {
  $description,
  $name,
  $url,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  urlChanged,
} from "./model";

export const OnboardingWorkspacePage = () => {
  return (
    <OnboardingLayout icon="common/folder-shield" backgroundImage="bg-geometric-square">
      <div className="flex flex-col gap-4 sm:gap-5">
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Let's build a Workspace
        </h1>
        <p className="text-lg font-normal text-gray-600 md:text-xl">
          Boost your productivity by making it easier for everyone to access boards in one location.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <OnboardingForm />
      </div>
    </OnboardingLayout>
  );
};

const OnboardingForm = () => {
  const handleSubmit = useUnit(formSubmitted);

  return (
    <>
      <form id="form" onSubmit={handleSubmit} className=" flex w-full flex-col gap-6">
        <WorkspaceName />
        <WorkspaceURL />
        <Description />
      </form>
      <Button type="submit" size="lg" form="form" variant="primary">
        Get started
      </Button>
    </>
  );
};

const Description = () => {
  const [description, handleChangeDescription] = useUnit([$description, descriptionChanged]);

  return (
    <InputArea
      caption="Description"
      placeholder="Our team organizes everything here."
      value={description ?? undefined}
      onChange={handleChangeDescription}
    />
  );
};

const WorkspaceName = () => {
  const [name, handleChangeName] = useUnit([$name, nameChanged]);

  return (
    <Input
      caption="Workspace name"
      placeholder="Your Company Co."
      value={name ?? undefined}
      onChange={handleChangeName}
    />
  );
};

const WorkspaceURL = () => {
  const [url, handleChangeUrl] = useUnit([$url, urlChanged]);

  return (
    <InputWeb
      rightPlaceholder="your-company-co"
      leftPlaceholder="brello.io/workspaces/"
      rightValue={url ?? undefined}
      onChange={handleChangeUrl}
    />
  );
};
