import type { FormEventHandler, ReactElement } from "react";

import { Input } from "src/shared/ui/input";
import { Layout } from "src/widgets/layout";
import { Button } from "src/shared/ui/button";
import { Upload } from "src/shared/ui/upload";
import { useUnit } from "effector-react";
import { resetButtonClicked } from "../model";

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
      <section className="container mx-auto my-0 flex flex-col gap-8 px-4 sm:px-8">
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-2xl font-semibold text-gray-900">
            Profile settings
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <form
            id="form"
            onSubmit={handleSubmit}
            onReset={handleResetForm}
            className="flex flex-col gap-8"
          >
            <div className="grid gap-5 sm:grid-cols-[280px_512px]  sm:items-center sm:gap-8 ">
              <h3 className="hidden w-full shrink-0 sm:inline">name</h3>
              <div className="grid w-full  gap-6 sm:grid-cols-2">
                <Input
                  size="md"
                  caption="First name"
                  placeholder="First name"
                />
                <Input caption="Last name" placeholder="Last name" size="md" />
              </div>
            </div>
            <hr className="flex h-px w-full bg-gray-200" />
            <div className="grid w-full gap-5  text-sm text-gray-700 sm:grid-cols-[280px_512px] sm:gap-8">
              <div className="flex w-full shrink-0 flex-col">
                <h3 className="first-letter:uppercase">your photo</h3>
                <p className="font-normal text-gray-600">
                  This will be displayed on your profile.
                </p>
              </div>
              <div className="flex w-full flex-col gap-5  sm:flex-row">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-400 text-gray-200">
                  X
                </div>
                <Upload />
              </div>
            </div>
          </form>
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5">
            <Button size="sm" variant="secondaryGray" type="reset" form="form">
              cancel
            </Button>
            <Button type="submit" size="sm" variant="primary" form="form">
              save
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
