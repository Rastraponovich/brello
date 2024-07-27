import { useUnit } from "effector-react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { Avatar } from "~/shared/ui/avatar";
import { FormBlock, FormFooterActions } from "~/shared/ui/form-layouts";
import { Input } from "~/shared/ui/input";
import { Upload } from "~/shared/ui/upload";

import {
  $avatarName,
  $firstName,
  $lastName,
  firstNameChanged,
  lastNameChanged,
  profileUpdate,
  resetButtonClicked,
} from "./model";

/**
 * User Settings Page
 * @returns {React.ReactElement}
 */
export function UserPage(): React.ReactElement {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-hidden px-4 sm:px-8">
        <PageHeader title="Profile settings" divider />

        <Form>
          <ProfileSettingsName />

          <ProfileSettingsUploadImage />
        </Form>

        <FormFooterActions />
      </section>
    </MainLayout>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  const submit = useUnit(profileUpdate);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submit();
  };

  const handleResetForm = useUnit(resetButtonClicked);

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      onReset={handleResetForm}
      className="scroll-shadows -mx-4 flex flex-col gap-5 overflow-auto px-4"
    >
      {children}
    </form>
  );
}

function ProfileSettingsName() {
  return (
    <FormBlock title="Name">
      <div className="grid w-full gap-6 sm:grid-cols-2">
        <NameField />

        <LastNameField />
      </div>
    </FormBlock>
  );
}

function NameField() {
  const value = useUnit($firstName);
  const onValueChange = useUnit(firstNameChanged);

  return (
    <Input
      size="md"
      value={value}
      caption="First name"
      placeholder="First name"
      onValueChange={onValueChange}
    />
  );
}

function LastNameField() {
  const value = useUnit($lastName);
  const onValueChange = useUnit(lastNameChanged);

  return (
    <Input
      size="md"
      value={value}
      caption="Last name"
      placeholder="Last name"
      onValueChange={onValueChange}
    />
  );
}

function ProfileSettingsUploadImage() {
  const { firstName, lastName } = useUnit($avatarName);

  return (
    <FormBlock title="Your photo" description="This will be displayed on your profile.">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
        <Avatar user={{ firstName, lastName, id: 123123 }} size="2xl" />

        <Upload />
      </div>
    </FormBlock>
  );
}
