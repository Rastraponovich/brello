import { useUnit } from "effector-react";

import { Button } from "~/shared/ui/button";

import { signinButtonClicked } from "./model";

export const HomePage = () => {
  const handleClick = useUnit(signinButtonClicked);

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-10">
      <section className="container mx-auto">
        <img src="/social.jpg" alt="logo" />
      </section>

      <section className="flex gap-4 flex-col">
        <header>
          <h1 className="text-2xl font-semibold">Welcome to brand new management tool!</h1>
        </header>
        <div className="self-center">
          <Button variant="primary" size="lg" onClick={handleClick}>
            Sign in
          </Button>
        </div>
      </section>
    </main>
  );
};
