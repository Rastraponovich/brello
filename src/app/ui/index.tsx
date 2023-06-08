import "app/styles/index.css";

import { StackList } from "entities/stack";

export const App = () => {
  return (
    <div className="flex flex-col items-center">
      <StackList />
    </div>
  );
};
