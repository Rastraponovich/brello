import { useState } from "react";
import "../styles/index.css";
import { Button } from "shared/button";
import { InputSearch } from "shared/input";
import { StackList } from "entities/stack";
import { WorkSpaceList } from "src/entities/workspaces";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <WorkSpaceList />
      <Button
        caption={` count is ${count}`}
        onClick={() => setCount((count) => count + 1)}
        pending={true}
        iconPosition="right"
        className=" rounded-lg border border-blue-500 px-4 py-2 text-blue-500 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:opacity-75"
      />
      <InputSearch caption="ebe" />

      <StackList />
    </div>
  );
};
