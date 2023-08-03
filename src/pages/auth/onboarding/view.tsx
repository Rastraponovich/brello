import { useUnit } from "effector-react";

import {
  $firstName,
  $lastName,
  firstNameChanged,
  formSubmitted,
  lastNameChanged,
  skipButtonClicked,
} from "./model";

import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";
import { Heading } from "shared/ui/heading";
import { OnboardingLayout } from "widgets/layout";

export const AuthOnboarding = () => {
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

/**
 * OnboardingForm component for capturing first name and last name.
 *
 * @returns JSX.Element
 */
const OnboardingForm = () => {

  // Destructure the form submission and input change handlers from the useUnit hook
  const [handleSubmit, handleFirstNameChange, handleLastNameChange] = useUnit([
    formSubmitted,
    firstNameChanged,
    lastNameChanged,
  ]);

  // Destructure the first name and last name values from the useUnit hook
  const [firstName, lastName] = useUnit([$firstName, $lastName]);

  return (
    <>
      {/* Form element */}
      <form
        id="form"
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-6 text-sm text-gray-700 sm:max-w-[512px] sm:flex-row sm:gap-8"
      >
        {/* First name input */}
        <Input
          placeholder="First name"
          caption="First name"
          value={firstName ?? undefined}
          onChange={handleFirstNameChange}
        />

        {/* Last name input */}
        <Input
          placeholder="Last name"
          caption="Last name"
          value={lastName ?? undefined}
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
