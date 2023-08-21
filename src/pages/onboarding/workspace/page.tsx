import { useUnit } from "effector-react";
import { FormEventHandler } from "react";

import { OnboardingLayout } from "~/layouts/onboarding-layout";

import { Button } from "~/shared/ui/button";
import { Input, InputArea } from "~/shared/ui/input";

// TODO: create onChangeValue method in input;
import {
  $description,
  $error,
  $name,
  $nameValid,
  $slug,
  $slugValid,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  slugChanged,
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
  const submitClicked = useUnit(formSubmitted);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    submitClicked();
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit} className=" flex w-full flex-col gap-6">
        <WorkspaceName />
        <WorkspaceSlug />
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
      value={description}
      caption="Description"
      placeholder="Our team organizes everything here."
      onChange={(e) => handleChangeDescription(e.target.value)}
    />
  );
};

const WorkspaceName = () => {
  const [name, handleChangeName, valid, errorCode] = useUnit([
    $name,
    nameChanged,
    $nameValid,
    $error,
  ]);

  return (
    <Input
      value={name}
      caption="Workspace name"
      placeholder="Your Company Co."
      error={!valid && errorCode}
      onChange={(e) => handleChangeName(e.target.value)}
    />
  );
};

const WorkspaceSlug = () => {
  const [slug, handleChangeSlug, valid, errorCode] = useUnit([
    $slug,
    slugChanged,
    $slugValid,
    $error,
  ]);

  return (
    <Input
      placeholder="your-company-co"
      caption="brello.io/workspaces/"
      value={slug}
      error={!valid && errorCode}
      onChange={(e) => handleChangeSlug(e.target.value)}
    />
  );
};
