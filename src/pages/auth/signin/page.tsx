import { useUnit } from "effector-react";
import { FormEvent, ReactNode, memo } from "react";

import { LayoutAuthn } from "~/layouts/authn/view";

import { SocialAuthButton } from "~/features/auth/social-auth-button";

import { TColors } from "~/shared/lib";
import { Button } from "~/shared/ui/button";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Heading } from "~/shared/ui/heading";
import { IconName } from "~/shared/ui/icon";
import { Input } from "~/shared/ui/input";

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

export const SignInPage = () => {
  const [error, isFinished] = useUnit([$error, $isFinished]);

  return (
    <LayoutAuthn>
      {!isFinished && !error && <LoginForm />}
      {isFinished && !error && <FinishedSendStatus />}
      {error && <ErrorSendStatus />}
    </LayoutAuthn>
  );
};

const LoginForm = () => {
  const [email, pending, error] = useUnit([$email, $isPendning, $invalidEmailText, $isValidEmail]);
  const [onSubmit, handleChangeEmail, handleSignInWithGoogle] = useUnit([
    submitted,
    changedEmail,
    signInWithGoogle,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <>
      <header className="flex flex-col gap-3">
        <Heading as="h1">Sign in</Heading>
        <span className="text-base font-normal text-gray-600">Start your 30-day free trial.</span>
      </header>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          placeholder="Enter your email"
          onValueChange={handleChangeEmail}
          value={email}
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
