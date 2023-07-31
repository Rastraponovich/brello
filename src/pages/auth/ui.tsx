import { useUnit } from "effector-react";
import { type FormEventHandler, memo } from "react";

import {
  $errors,
  submitted,
  $isPendning,
  $emailField,
  changedEmail,
  $isValidEmail,
  skipButtonClicked,
} from "./model";

import { routes } from "shared/routing";

import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";
import { Link } from "atomic-router-react";
import { Heading } from "shared/ui/heading";
import { Logo } from "shared/ui/icons/logo";
import { OnboardingLayout } from "widgets/layout";
import { Icon, type IconName } from "shared/ui/icon";
import { FeaturedIcon } from "shared/ui/icons/featured-icon";
import { SocialAuthButton } from "features/auth/social-auth-button";

const statuses: Record<"check" | "error", SendStatusBlockProps> = {
  check: {
    icon: "common/mail",
    text: "Check your email",
    description: "We sent a login link to olivia@untitledui.com",
    buttonText: "Back to log in",
  },
  error: {
    icon: "alerts/alert-circle",
    text: "Some error happened",
    description: "With description",
    buttonText: "Try again",
    type: "error",
  },
};

export const AuthPage = () => {
  const [value, setValue] = useUnit([$emailField, changedEmail]);
  const onSubmit = useUnit(submitted);
  const isValidEmail = useUnit($isValidEmail);
  const pending = useUnit($isPendning);

  const errors = useUnit($errors);

  const linkSending: "error" | "check" | null = null;

  return (
    <main className="grid h-screen grid-rows-[62.5px_1fr] place-content-stretch overflow-hidden sm:grid-cols-2 sm:grid-rows-none">
      <section className="order-last flex w-full shrink flex-col items-center sm:order-first sm:px-0">
        <header className="mb-6 mt-8 flex w-full px-4 sm:my-8 sm:px-8">
          <Logo canHideTitle />
        </header>

        <section className="container mx-auto my-0 flex grow flex-col items-center justify-center px-4 sm:px-8">
          <section className="flex w-full max-w-[360px] grow flex-col justify-start gap-8 sm:justify-center">
            {linkSending ? (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              <SendStatusBlock {...statuses[linkSending]} />
            ) : (
              <>
                <header className="flex flex-col gap-2">
                  <Heading as="h1">Sign in</Heading>
                  <span className="text-base font-normal text-gray-600">
                    Start your 30-day free trial.
                  </span>
                </header>
                <form
                  noValidate
                  onSubmit={onSubmit}
                  className="flex flex-col gap-6"
                >
                  <Input
                    placeholder="Enter your email"
                    hasError={!isValidEmail}
                    value={value as string}
                    onChange={setValue}
                    disabled={pending}
                    errors={errors}
                    caption="Email"
                    type="email"
                    disableIcon
                    required
                  />

                  <div className="col-start-1 flex flex-col gap-4 md:col-start-2">
                    <Button
                      disabled={pending}
                      pending={pending}
                      variant="primary"
                      type="submit"
                      size="md"
                    >
                      Get started
                    </Button>

                    <SocialAuthButton
                      disabled={pending}
                      social="google"
                      theme="brand"
                      type="button"
                    />
                  </div>
                </form>
              </>
            )}
          </section>
        </section>

        <footer className="hidden w-full justify-between px-8 py-8 text-sm font-normal text-gray-400 sm:flex">
          <span>&copy; Brello 2023</span>
          <a href="mailto:help@brello.io" className="flex items-center gap-2">
            <Icon name="common/mail" size="small" />
            <span>help@brello.io</span>
          </a>
        </footer>
      </section>
      <section className="order-first place-self-auto overflow-hidden sm:order-last">
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
      </section>
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
      <header className="flex flex-col gap-4 sm:gap-5">
        <Heading as="h1" className="text-4xl  tracking-[-0.72px] ">
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
      </header>
      <section className="flex flex-col gap-8">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-6 text-sm text-gray-700 sm:max-w-[512px] sm:flex-row sm:gap-8"
        >
          <Input placeholder="First name" caption="First name" />
          <Input placeholder="Last name" caption="Last name" />
        </form>
        <Button type="submit" size="lg" form="form" variant="primary">
          Continue
        </Button>
      </section>
    </OnboardingLayout>
  );
};

interface SendStatusBlockProps {
  text: string;
  description: string;
  icon: IconName;
  buttonText: string;
  type?: "error";
}
const SendStatusBlock = memo<SendStatusBlockProps>(
  ({ text, description, buttonText, type, icon }) => {
    return (
      <>
        <header className="flex flex-col items-start gap-6">
          <FeaturedIcon
            icon={icon}
            variant="outline"
            color={type === "error" ? "error" : "primary"}
            type="circle"
            size="xl"
          />
          <div className="flex flex-col gap-3">
            <Heading as="h1">{text}</Heading>
            <p className="text-base text-gray-600">{description}</p>
          </div>
        </header>
        <Link to={routes.auth.login}>
          <Button
            size="sm"
            type="button"
            variant="linkGray"
            leftIcon="arrows/arrow-left"
          >
            {buttonText}
          </Button>
        </Link>
      </>
    );
  },
);
