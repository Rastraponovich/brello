import { useUnit } from "effector-react";
import { type ReactNode, memo } from "react";

import { LayoutAuthn } from "~/layouts/authn/view";

import type { TColors } from "~/shared/lib";
import { Button } from "~/shared/ui/button";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Heading } from "~/shared/ui/heading";
import type { IconName } from "~/shared/ui/icon";
import { Loader } from "~/shared/ui/loader";

import { $pending, $successfuly, goBackButtonClicked } from "./model";

type StatusConfig = {
  icon: IconName;
  text: string;
  buttonText: string;
};

const sendStatusConfig: Record<"finished" | "error", StatusConfig> = {
  finished: {
    icon: "common/mail",
    text: "Collect your private information and keys",
    buttonText: "Back to log in",
  },
  error: {
    icon: "alerts/alert-circle",
    text: "Some error happened",
    buttonText: "Try again",
  },
};

export const FinishSignInPage = () => {
  const [pending, successfuly] = useUnit([$pending, $successfuly]);

  return (
    <LayoutAuthn>
      {pending ? (
        <div className="flex p-2 animate-pulse">
          <Loader />
          место сдается под рекламу
        </div>
      ) : !successfuly ? (
        <ErrorSendStatus />
      ) : (
        <FinishedSendStatus />
      )}
    </LayoutAuthn>
  );
};

interface SendStatusProps extends StatusConfig {
  description: ReactNode | null;
  iconColor?: TColors;
}
const SendStatus = memo<SendStatusProps>(
  ({ text, description, buttonText, icon, iconColor = "primary" }) => {
    const handleBackButtonClicked = useUnit(goBackButtonClicked);

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
  return (
    <SendStatus
      iconColor="error"
      description={"Где-то залажало, но попробуйте еще раз"}
      {...sendStatusConfig["error"]}
    />
  );
};

const FinishedSendStatus = () => {
  return <SendStatus {...sendStatusConfig["finished"]} description={`Братан, ща все будет `} />;
};
