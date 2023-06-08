import { memo, useState } from "react";
import { Button } from "src/shared/ui/button";

type TWorkspace = {
  id: number;
  title: string;
  icon?: string;
};

const WORKSPACES: TWorkspace[] = [
  {
    id: 1,
    title: "first",
  },
  {
    id: 2,
    title: "second",
  },
];

export const WorkSpaceList = () => {
  const [workspaces, setWorkspaces] = useState(WORKSPACES);
  return (
    <div className="flex flex-col space-y-2">
      <Button
        caption="+"
        className="border-gray-5000 rounded-lg border-2 px-20 py-10 text-4xl text-gray-500"
      />
      {workspaces.map((workspace) => (
        <Workspace key={workspace.id} {...workspace} />
      ))}
    </div>
  );
};

interface IWorkspaceProps extends TWorkspace {}

const Workspace = memo<IWorkspaceProps>(({ title }) => {
  return (
    <div className="flex items-center space-x-2 text-xl">
      <span className="h-8 w-8 bg-gray-400"></span>
      <span>{title}</span>
    </div>
  );
});
