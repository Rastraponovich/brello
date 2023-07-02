import "app/styles/index.css";

import { Header } from "src/widgets/header";

export const App = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">{/* <StackList /> */}</main>
    </>
  );
};
