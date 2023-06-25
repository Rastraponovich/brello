import { BoardList } from "src/entities/board";
import { Header } from "src/widgets/header";

export const BoardPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="container mx-auto my-0 flex grow flex-col overflow-y-hidden pb-24 pt-12">
        <div className="flex grow overflow-x-auto">
          <div className="flex items-start gap-12  px-8">
            <BoardList />
            <BoardList />
            <BoardList />
            <BoardList />
          </div>
        </div>
      </main>
    </div>
  );
};
