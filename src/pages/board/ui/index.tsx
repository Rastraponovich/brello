import { BoardList } from "src/entities/board";
import { AvatarGroup } from "src/shared/ui/avatar";
import { IconButton } from "src/shared/ui/button";
import { StarIcon } from "src/shared/ui/icons/common";
import { Header } from "src/widgets/header";

const PageHeaderContent = () => {
  return (
    <section className="flex flex-col justify-between gap-5 border-b border-gray-200 px-8 pb-5 sm:flex-row">
      <div className="flex flex-col justify-start gap-4 text-3xl font-semibold text-gray-900 sm:flex-row sm:items-center">
        <h2 className="w-full">Sprint #3 (03.04.2023 - 10.04.2023)</h2>
        <IconButton
          icon={<StarIcon />}
          size="sm"
          variant="tertiaryGray"
          className="self-start sm:self-auto"
        />
      </div>
      <AvatarGroup
        items={[{ id: 1 }, { id: 3 }, { id: 2 }, { id: 5 }, { id: 4 }]}
        size="md"
        counter={5}
      />
    </section>
  );
};

export const BoardPage = () => {
  return (
    <div className="flex h-screen flex-col overflow-auto sm:overflow-hidden">
      <Header />
      <main className="container mx-auto my-0 flex grow flex-col gap-8 pb-12 pt-8 sm:overflow-y-hidden sm:pb-24 sm:pt-12">
        <PageHeaderContent />
        <div className="flex snap-x snap-mandatory scroll-px-4 items-start gap-12 overflow-x-auto overflow-y-auto px-4 sm:scroll-px-8 sm:px-8">
          <BoardList />
          <BoardList />
          <BoardList />
          <BoardList />
        </div>
      </main>
    </div>
  );
};
