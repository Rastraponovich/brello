import { useUnit } from "effector-react";

import { Button } from "~/shared/ui/button";

import { signinButtonClicked } from "./model";

export function HomePage() {
  const handleClick = useUnit(signinButtonClicked);

  return (
    <main className="container mx-auto flex h-dvh flex-col items-center justify-center gap-10">
      <section className="flex justify-center">
        <img src="/social.jpg" alt="logo" width={800} height={600} />
      </section>

      <section className="flex flex-col gap-4">
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
}
