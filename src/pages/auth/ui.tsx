import { FormEventHandler } from "react";
import { useUnit } from "effector-react";

import {
  skipButtonClicked,
  $emailField,
  changedEmail,
  submitted,
} from "./model";

import { Input } from "src/shared/ui/input";

import { Icon } from "src/shared/ui/icon";
import { Button } from "src/shared/ui/button";
import { Heading } from "src/shared/ui/heading";

import { Logo } from "src/shared/ui/icons/logo";
import { OnboardingLayout } from "src/widgets/layout";
import { SocialAuthButton } from "src/features/social-auth-button";

export const AuthPage = () => {
  const [value, setValue] = useUnit([$emailField, changedEmail]);
  const onSubmit = useUnit(submitted);

  return (
    <main className="grid h-screen grid-rows-[62.5px_1fr] place-content-stretch overflow-hidden sm:grid-cols-2 sm:grid-rows-none">
      <div className="order-last flex w-full shrink flex-col items-center sm:order-first sm:px-0">
        <Logo className="mb-6 mt-8 w-full px-4 sm:my-8 sm:px-8" />
        <div className="flex w-full max-w-[360px] grow flex-col justify-start px-4 sm:justify-center sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
          <h3 className="mt-2 text-base font-normal text-gray-600">
            Start your 30-day free trial.
          </h3>
          <form onSubmit={onSubmit} className=" mt-8 flex flex-col" noValidate>
            <Input
              caption="Email"
              placeholder="Enter your email"
              value={value as string}
              onChange={setValue}
              type="email"
              required
              hint={{
                text: "Please enter a valid email address",
                type: "invalid",
              }}
            />

            <div className="col-start-1 mt-6 flex flex-col space-y-4  md:col-start-2">
              <Button type="submit" variant="primary" size="md">
                Get started
              </Button>

              <SocialAuthButton social="google" theme="brand" type="button" />
            </div>
          </form>
        </div>
        <div className="hidden w-full justify-between px-8 py-8 text-sm font-normal text-gray-400 sm:flex">
          <span>&copy; Brello 2023</span>
          <a href="mailto:help@brello.io" className="flex items-center gap-2">
            <Icon name={"common/mail"} size={"small"} />
            <span>help@brello.io</span>
          </a>
        </div>
      </div>
      <div className="order-first place-self-auto overflow-hidden sm:order-last">
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          src="images/geometric-shapes.svg"
          className="hidden h-full object-cover object-left-top sm:block"
        />
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          height={63}
          className="object-left sm:hidden"
          src="images/geometric-shapes-small.svg"
        />
      </div>
    </main>
  );
};

export const AuthOnboarding = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleSkip = useUnit(skipButtonClicked);
  return (
    <OnboardingLayout icon="common/user" backgroundImage="bg-cells-pattern">
      <div className="flex flex-col gap-4 sm:gap-5">
        <Heading as="h2" className="text-4xl font-semibold text-gray-900">
          Please, introduce yourself
        </Heading>
        <p className="text-xl font-normal text-gray-600">
          You can do this later on Profile page.{" "}
          <Button
            onClick={handleSkip}
            variant="link"
            size="sm"
            className="inline-flex !text-xl !font-normal"
          >
            Skip
          </Button>
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <form
          onSubmit={handleSubmit}
          id="form"
          className="flex w-full flex-col gap-6 text-sm text-gray-700 sm:max-w-[512px] sm:flex-row sm:gap-8"
        >
          <Input placeholder="First name" caption="First name" />
          <Input placeholder="Last name" caption="Last name" />
        </form>
        <Button type="submit" size="lg" form="form" variant="primary">
          Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
};
