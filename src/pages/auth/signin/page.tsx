import { useUnit } from "effector-react";
import { memo } from "react";

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

const LayoutMap = new Map([
  ["login", <LoginForm key="login" />],
  ["error", <ErrorSendStatus key="error" />],
  ["finished", <FinishedSendStatus key="finished" />],
]);

export function SignInPage() {
  const [error, isFinished] = useUnit([$error, $isFinished]);

  const Component = LayoutMap.get(error ? "error" : isFinished ? "finished" : "login");

  return <LayoutAuthn>{Component}</LayoutAuthn>;
}

function LoginForm() {
  return (
    <>
      <header className="flex flex-col gap-3">
        <Heading as="h1">Sign in</Heading>

        <span className="text-base font-normal text-gray-600">Start your 30-day free trial.</span>
      </header>

      <Form>
        <EmailField />

        <div className="flex flex-col gap-4">
          <SubmitButton />

          <SocialAuthnButton />
        </div>
      </Form>
    </>
  );
}
function Form({ children }: { children: React.ReactNode }) {
  const onSubmit = useUnit(submitted);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6" id="form">
      {children}
    </form>
  );
}

function SubmitButton() {
  const [pending, error] = useUnit([$isPendning, $isValidEmail]);

  return (
    <Button
      size="md"
      form="form"
      type="submit"
      pending={pending}
      variant="primary"
      disabled={!error}
    >
      Get started
    </Button>
  );
}

function SocialAuthnButton() {
  const pending = useUnit($isPendning);

  const handleSignInWithGoogle = useUnit(signInWithGoogle);

  return (
    <SocialAuthButton
      form="form"
      type="button"
      theme="brand"
      social="google"
      pending={pending}
      onClick={handleSignInWithGoogle}
    />
  );
}

function EmailField() {
  const handleChangeEmail = useUnit(changedEmail);
  const [email, pending, error] = useUnit([$email, $isPendning, $invalidEmailText]);

  return (
    <Input
      required
      disableIcon
      type="email"
      value={email}
      error={error}
      caption="Email"
      disabled={pending}
      placeholder="Enter your email"
      onValueChange={handleChangeEmail}
    />
  );
}

interface SendStatusProps extends StatusConfig {
  iconColor?: TColors;
  description: React.ReactNode | null;
}
const SendStatus = memo<SendStatusProps>((props) => {
  const { text, description, buttonText, icon, iconColor = "primary" } = props;

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
});

function ErrorSendStatus() {
  const error = useUnit($error);

  return <SendStatus iconColor="error" description={error} {...sendStatusConfig["error"]} />;
}

function FinishedSendStatus() {
  const email = useUnit($email);

  const description = `We sent a login link to ${email}`;

  return <SendStatus {...sendStatusConfig["finished"]} description={description} />;
}
