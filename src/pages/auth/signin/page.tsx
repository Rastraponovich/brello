import { useUnit } from "effector-react";
import { ReactNode } from "react";

import { LayoutAuthn } from "~/layouts/authn/view";

import { SocialAuthButton } from "~/features/auth/social-auth-button";

import { Button } from "~/shared/ui/button";
import { Heading } from "~/shared/ui/heading";
import { Input } from "~/shared/ui/input";

import {
  $email,
  $invalidEmailText,
  $isPendning,
  $isValidEmail,
  type SignInError,
  changedEmail,
  signInWithGoogle,
  submitted,
} from "./model";

const errorText: {
  [K in SignInError]: ReactNode | null;
} = {
  InvalidEmail: "Must be a valid email.",
  RateLimit: "Too much requests. Please, try again later.",
  UnknownError: "Something happened. Please, try again later.",
};

export const SignInPage = () => {
  return (
    <LayoutAuthn>
      <LoginForm />
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
