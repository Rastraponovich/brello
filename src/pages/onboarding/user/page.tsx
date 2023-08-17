import { useUnit } from "effector-react";

import { OnboardingLayout } from "~/layouts/onboarding-layout";

import { Button } from "~/shared/ui/button";
import { Heading } from "~/shared/ui/heading";
import { Input } from "~/shared/ui/input";

import {
  $firstName,
  $lastName,
  firstNameChanged,
  formSubmitted,
  lastNameChanged,
  skipButtonClicked,
} from "./model";

export const PageLoader = () => {
  return (
    <OnboardingLayout icon="common/user" backgroundImage="bg-cells-pattern">
      <header className="flex flex-col gap-4 sm:gap-5">
        <Heading as="h1" className="text-4xl tracking-[-0.72px]">
          Loading..
        </Heading>
        <p className="text-xl font-normal text-gray-600 animate-pulse">Please wait</p>
      </header>
    </OnboardingLayout>
  );
};

export const OnboardingAuthPage = () => {
  const handleSkip = useUnit(skipButtonClicked);

  return (
    <OnboardingLayout icon="common/user" backgroundImage="bg-cells-pattern">
      <header className="flex flex-col gap-4 sm:gap-5">
        <Heading as="h1" className="text-4xl  tracking-[-0.72px] ">
          Please, introduce yourself
        </Heading>
        <p className="text-xl font-normal text-gray-600">
          You can do this later on Profile page.{" "}
          <Button
            size="sm"
            variant="link"
            onClick={handleSkip}
            className="inline-flex !text-xl !font-normal"
          >
            Skip
          </Button>
        </p>
      </header>
      <section className="flex flex-col gap-8">
        <OnboardingForm />
      </section>
    </OnboardingLayout>
  );
};

const OnboardingForm = () => {
  const [handleSubmit, handleFirstNameChange, handleLastNameChange] = useUnit([
    formSubmitted,
    firstNameChanged,
    lastNameChanged,
  ]);

  const [firstName, lastName] = useUnit([$firstName, $lastName]);

  return (
    <>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 text-sm text-gray-700 sm:max-w-[512px] sm:flex-row sm:gap-8"
      >
        <Input
          placeholder="First name"
          caption="First name"
          value={firstName ?? ""}
          onChange={handleFirstNameChange}
        />

        <Input
          placeholder="Last name"
          caption="Last name"
          value={lastName ?? ""}
          onChange={handleLastNameChange}
        />
      </form>

      {/* Continue button */}
      <Button type="submit" size="lg" form="form" variant="primary">
        Continue
      </Button>
    </>
  );
};
