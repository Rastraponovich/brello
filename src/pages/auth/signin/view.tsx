import { useUnit } from "effector-react";
import { ReactNode, memo } from "react";

import { SocialAuthButton } from "features/auth/social-auth-button";

import { TColors } from "shared/lib";
import { Button } from "shared/ui/button";
import { Heading } from "shared/ui/heading";
import { Icon, type IconName } from "shared/ui/icon";
import { FeaturedIcon } from "shared/ui/icons/featured-icon";
import { Logo } from "shared/ui/icons/logo";
import { Input } from "shared/ui/input";

import {
  $email,
  $error,
  $invalidEmailText,
  $isFinished,
  $isPendning,
  $isValidEmail,
  type SignInError,
  backButtonClicked,
  changedEmail,
  signInWithGoogle,
  submitted,
} from "./model";

type StatusConfig = {
  icon: IconName;
  text: string;
  buttonText: string;
};
const sendStatusConfig: Record<"finished" | "error", StatusConfig> = {
  finished: {
    icon: "common/mail",
    text: "Check your email",
    buttonText: "Back to log in",
  },
  error: {
    icon: "alerts/alert-circle",
    text: "Some error happened",
    buttonText: "Try again",
  },
};

const errorText: {
  [K in SignInError]: ReactNode | null;
} = {
  InvalidEmail: "Must be a valid email.",
  RateLimit: "Too much requests. Please, try again later.",
  UnknownError: "Something happened. Please, try again later.",
};

export const AuthPage = () => {
  const [finished, error] = useUnit([$isFinished, $error]);

  return (
    <main className="grid h-screen grid-rows-[62.5px_1fr] overflow-hidden sm:grid-cols-2 sm:grid-rows-none">
      <section className="order-last flex flex-col sm:order-first sm:gap-0 sm:px-0">
        <header className="px-4 pb-6 pt-8 sm:p-8">
          <Logo canHideTitle />
        </header>

        <section className="flex flex-col justify-center gap-8 px-4 sm:container sm:mx-auto sm:max-w-[360px] sm:grow sm:px-0">
          {error && <ErrorSendStatus />}
          {finished && <FinishedSendStatus />}
          {!finished && !error && <LoginForm />}
        </section>

        <footer className="hidden justify-between p-8 text-sm font-normal text-gray-400 sm:flex">
          <span>&copy; Brello 2023</span>
          <a href="mailto:help@brello.io" className="flex items-center gap-2">
            <Icon name="common/mail" size="small" />
            <span>help@brello.io</span>
          </a>
        </footer>
      </section>
      <aside className="order-first place-self-auto overflow-hidden sm:order-last">
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          src="images/geometric-shapes.svg"
          className="hidden h-full w-full object-cover object-left-top sm:block"
        />
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          height={63}
          className="w-full object-left sm:hidden"
          src="images/geometric-shapes-small.svg"
        />
      </aside>
    </main>
  );
};

const LoginForm = () => {
  const [email, pending, error] = useUnit([$email, $isPendning, $invalidEmailText, $isValidEmail]);
  const [onSubmit, handleChangeEmail, handleSignInWithGoogle] = useUnit([
    submitted,
    changedEmail,
    signInWithGoogle,
  ]);

  return (
    <>
      <header className="flex flex-col gap-3">
        <Heading as="h1">Sign in</Heading>
        <span className="text-base font-normal text-gray-600">Start your 30-day free trial.</span>
      </header>
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
        <Input
          placeholder="Enter your email"
          onChange={handleChangeEmail}
          value={email ?? undefined}
          disabled={pending}
          caption="Email"
          error={error ? errorText[error] : null}
          type="email"
          disableIcon
          required
        />

        <div className="flex flex-col gap-4">
          <Button pending={pending} variant="primary" type="submit" size="md">
            Get started
          </Button>

          <SocialAuthButton
            pending={pending}
            onClick={handleSignInWithGoogle}
            social="google"
            theme="brand"
            type="button"
          />
        </div>
      </form>
    </>
  );
};

const ErrorSendStatus = () => {
  const error = useUnit($error);

  return (
    <SendStatus
      iconColor="error"
      description={errorText[error ?? "UnknownError"]}
      {...sendStatusConfig["error"]}
    />
  );
};

const FinishedSendStatus = () => {
  const email = useUnit($email);

  return (
    <SendStatus
      {...sendStatusConfig["finished"]}
      description={`We sent a login link to ${email}`}
    />
  );
};

interface SendStatusProps extends StatusConfig {
  description: ReactNode | null;
  iconColor?: TColors;
}
const SendStatus = memo<SendStatusProps>(
  ({ text, description, buttonText, icon, iconColor = "primary" }) => {
    const handleBackButtonClicked = useUnit(backButtonClicked);

    return (
      <>
        <header className="flex flex-col items-start gap-6">
          <FeaturedIcon icon={icon} variant="outline" color={iconColor} type="circle" size="xl" />
          <div className="flex flex-col gap-3">
            <Heading as="h1">{text}</Heading>
            <p className="text-base text-gray-600">{description}</p>
          </div>
        </header>
        <Button
          size="sm"
          type="button"
          variant="linkGray"
          className="self-start"
          leftIcon="arrows/arrow-left"
          onClick={handleBackButtonClicked}
        >
          {buttonText}
        </Button>
      </>
    );
  },
);
