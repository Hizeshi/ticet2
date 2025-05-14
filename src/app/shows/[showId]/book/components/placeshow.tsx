import { cn } from "@/lib/utils";
interface Props {
  className: string;
}
export const PlaceShow: React.FC<Props> = ({ className }) => {
  const SeatCircle = ({ isPink }: { isPink?: boolean }) => (
    <div
      className={cn(
        "w-6 h-6 rounded-full border flex-shrink-0",
        isPink ? "bg-rose-200 border-rose-400" : "bg-white border-gray-400"
      )}
    ></div>
  );

  const SeatStaticRow = ({
    label,
    seatsCount,
    pinkIndices = [],
  }: {
    label: string;
    seatsCount: number;
    pinkIndices?: number[];
  }) => (
    <div className="flex items-center space-x-3 mb-2">
      <div className="w-24 text-sm text-gray-700 text-right shrink-0 pr-1">
        {label}
      </div>
      <div className="flex flex-nowrap space-x-1.5">
        {Array.from({ length: seatsCount }).map((_, i) => (
          <SeatCircle key={i} isPink={pinkIndices.includes(i)} />
        ))}
      </div>
    </div>
  );
  const totalSeatsPerRow = 14;
  return (
    <div className="lg:col-span-2">
      <div className="p-6 border rounded-4xl bg-white shadow-md border-gray-950">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 border border-green-300 text-gray-800 py-2 px-20 text-center text-base font-medium">
            Stage
          </div>
        </div>

        <div className="space-y-0.5 overflow-x-auto pb-3">
          <SeatStaticRow
            label="Stall 01"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[]}
          />
          <SeatStaticRow
            label="Stall 02"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[11]}
          />
          <SeatStaticRow
            label="Stall 03"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[4]}
          />
          <SeatStaticRow
            label="Stall 04"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[6, 7, 8]}
          />
          <SeatStaticRow
            label="Stall 05"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[]}
          />
          <SeatStaticRow
            label="Stall 06"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[]}
          />
          <SeatStaticRow
            label="Terrace 01"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[5, 6, 7]}
          />
          <SeatStaticRow
            label="Terrace 02"
            seatsCount={totalSeatsPerRow}
            pinkIndices={[0, 1]}
          />
        </div>
      </div>
    </div>
  );
};
