import { useUnit } from "effector-react";
import type { FormEventHandler, ReactElement } from "react";

import { resetButtonClicked } from "./model";

import { Input } from "shared/ui/input";
import { Layout } from "widgets/layout";
import { Upload } from "shared/ui/upload";
import { Avatar } from "shared/ui/avatar";
import { PageHeader } from "widgets/page-header";
import { FormBlock, FormFooterActions } from "shared/ui/form-layouts";

/**
 * User Settings Page
 * @returns {ReactElement}
 */
export const UserPage = (): ReactElement => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleResetForm = useUnit(resetButtonClicked);
  return (
    <Layout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-hidden px-4 sm:px-8">
        <PageHeader title="Profile settings" divider />

        <form
          id="form"
          onSubmit={handleSubmit}
          onReset={handleResetForm}
          className="scroll-shadows -mx-4 flex flex-col gap-5 overflow-auto px-4"
        >
          <ProfileSettingsName />
          <ProfileSettingsUploadImage />
        </form>
        <FormFooterActions />
      </section>
    </Layout>
  );
};

const ProfileSettingsName = () => {
  return (
    <FormBlock title="Name">
      <div className="grid w-full gap-6 sm:grid-cols-2">
        <Input size="md" caption="First name" placeholder="First name" />
        <Input caption="Last name" placeholder="Last name" size="md" />
      </div>
    </FormBlock>
  );
};

const ProfileSettingsUploadImage = () => {
  return (
    <FormBlock
      title="Your photo"
      description="This will be displayed on your profile."
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
        <Avatar
          user={{ firstName: "x", lastName: "x", id: 123123 }}
          size="2xl"
        />

        <Upload />
      </div>
    </FormBlock>
  );
};
