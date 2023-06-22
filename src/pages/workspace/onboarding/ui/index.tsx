import { FormEventHandler } from "react";
import { Button } from "src/shared/ui/button";
import { FeaturedIcon } from "src/shared/ui/icons/featured-icon/ui";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";

// function dateRange(startDate: Date, endDate: Date, steps = 1): Date[] {
//   const dateArray: Date[] = [];
//   const currentDate: Date = new Date(startDate);

//   while (currentDate <= new Date(endDate)) {
//     dateArray.push(new Date(currentDate));
//     // Use UTC date to prevent problems with time zones and DST
//     currentDate.setUTCDate(currentDate.getUTCDate() + steps);
//   }

//   return dateArray;
// }

// const interval = {
//   start: new Date("01-01-2023"),
//   end: new Date("05-01-2023"),
// };

export const OnboardingPage = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <main className=" flex h-screen w-full flex-col items-center bg-geometric-square bg-[center_-390px] bg-no-repeat px-4 sm:bg-[center_-280px] md:p-0">
      <section className="mt-16 flex max-w-[512px] grow flex-col sm:mt-[111px]">
        <FeaturedIcon icon="shield-folder" />
        <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
          Let's build a Workspace
        </h1>
        <p className="mt-4 text-lg font-normal text-gray-600 md:mt-5 md:text-xl">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-12 flex max-w-[512px] flex-col space-y-6"
        >
          <Input caption="Workspace name" placeholder="Your Company Co." />
          <InputWeb
            leftPlaceholder="brello.io/workspaces/"
            rightPlaceholder="your-company-co"
          />
          <InputArea
            caption="Description"
            placeholder="Our team organizes everything here."
          />

          <Button
            type="submit"
            size="lg"
            className="border border-blue-600 bg-blue-600 px-5 py-3  text-white "
          >
            Get started
          </Button>
        </form>
      </section>
    </main>
  );
};
// const Test = () => {
//   const head = useRef<HTMLDivElement>(null);
//   const body = useRef<HTMLDivElement>(null);

//   const [datesInterval, setDatesInterval] = useState<Date[]>(
//     dateRange(interval.start, interval.end)
//   );

//   const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
//     e.preventDefault();
//     const value = e.currentTarget.scrollLeft;
//     if (head.current) {
//       head.current.scrollLeft = value;
//     }
//     if (body.current) {
//       body.current.scrollLeft = value;
//     }
//   };

//   const numbers = [...Array(100).keys()];

//   const getKey = (date: Date) => `${date.getDate()}--${date.getMonth()}`;

//   return (
//     <section className="mt-10 flex w-full">
//       <div className="flex max-h-[500px] flex-col overflow-hidden">
//         <div className="gridHead grid grid-cols-[100px_1fr_100px] ">
//           <div className="h-8 w-full border border-gray-300"></div>

//           <div
//             className="dynamicGrid  no-scrollbar grid  gap-x-1 overflow-x-scroll "
//             style={{
//               gridTemplateColumns: `repeat(${datesInterval.length},2rem)`,
//             }}
//             onScroll={handleScroll}
//             ref={head}
//           >
//             {datesInterval.map((dateInterval) => (
//               <div
//                 key={getKey(dateInterval)}
//                 className="flex h-8 w-8 items-center justify-center border border-gray-200"
//               >
//                 {dateInterval.getDate()}
//               </div>
//             ))}
//           </div>

//           <div className="h-8 w-full border border-gray-300"></div>
//         </div>
//         <div className="gridBody no-scrollbar grid grid-cols-[100px_1fr_100px] overflow-y-scroll">
//           <div className=" flex flex-col ">
//             {[...Array(100).keys()].map((name) => (
//               <div
//                 className="flex h-8 w-full items-center border border-transparent p-2 hover:border hover:border-y hover:border-black"
//                 key={name}
//               >
//                 {name}
//               </div>
//             ))}
//           </div>

//           <div
//             onScroll={handleScroll}
//             ref={body}
//             className="dynamicGrid no-scrollbar grid grid-cols-[repeat(100,2rem)] gap-x-1 overflow-x-scroll"
//           >
//             {numbers.map((number) => (
//               <div
//                 key={number}
//                 className="fle h-8 w-8 flex-col items-center justify-center"
//               >
//                 {[...Array(datesInterval.length).keys()].map((name) => (
//                   <div
//                     className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 "
//                     key={name}
//                   >
//                     {name}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div className="static flex flex-col">
//             <div className="flex flex-col">
//               {[...Array(3).keys()].map((name) => (
//                 <div
//                   className="h-8 w-full border border-transparent"
//                   key={name}
//                 >
//                   {name}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
