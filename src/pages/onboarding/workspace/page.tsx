import { useUnit } from "effector-react";
import { FormEventHandler } from "react";

import { OnboardingLayout } from "~/layouts/onboarding-layout";

import { Button } from "~/shared/ui/button";
import { Input, InputArea } from "~/shared/ui/input";

// TODO: create onChangeValue method in input;
import {
  $description,
  $name,
  $nameError,
  $slug,
  $slugError,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  slugChanged,
} from "./model";

export function PageLoader() {
  return (
    <OnboardingLayout icon="common/folder-shield" backgroundImage="bg-geometric-square">
      <div className="flex flex-col gap-4 sm:gap-5">
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">Loading, please wait</h1>
      </div>

      <div className="flex flex-col gap-8"></div>
    </OnboardingLayout>
  );
}

export function OnboardingWorkspacePage() {
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

        <Button type="submit" size="lg" form="form" variant="primary">
          Get started
        </Button>
      </div>
    </OnboardingLayout>
  );
}

function OnboardingForm() {
  return (
    <Form>
      <WorkspaceName />

      <WorkspaceSlug />

      <Description />
    </Form>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  const submitClicked = useUnit(formSubmitted);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    submitClicked();
  };

  return (
    <form id="form" onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
      {children}
    </form>
  );
}

function Description() {
  const [description, handleChangeDescription] = useUnit([$description, descriptionChanged]);

  return (
    <InputArea
      value={description}
      caption="Description"
      onValueChange={handleChangeDescription}
      placeholder="Our team organizes everything here."
    />
  );
}

function WorkspaceName() {
  const [name, handleChangeName, error] = useUnit([$name, nameChanged, $nameError]);

  return (
    <Input
      value={name}
      error={error}
      caption="Workspace name"
      placeholder="Your Company Co."
      onValueChange={handleChangeName}
    />
  );
}

function WorkspaceSlug() {
  const [slug, handleChangeSlug, error] = useUnit([$slug, slugChanged, $slugError]);

  return (
    <Input
      value={slug}
      error={error}
      placeholder="your-company-co"
      caption="brello.io/workspaces/"
      onValueChange={handleChangeSlug}
    />
  );
}
