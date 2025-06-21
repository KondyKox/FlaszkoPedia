import { VodkaVariant } from "@/types/VodkaProps";
import Image from "next/image";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00bfff"];
const getColor = (index: number) => colors[index % colors.length];

const PriceHistoryChart = ({ variant }: { variant: VodkaVariant }) => {
  const allDatesSet = new Set<string>();
  const storePricesMap = new Map<string, { [date: string]: number }>();
  const storeMetaMap = new Map<string, { image: string }>();

  variant.stores.forEach((store) => {
    const priceHistory: { [date: string]: number } = {};
    store.priceHistory.forEach((entry) => {
      const formattedDate = new Date(entry.date).toLocaleDateString("pl-PL");
      allDatesSet.add(formattedDate);
      priceHistory[formattedDate] = entry.price;
    });

    storePricesMap.set(store.name, priceHistory);
    storeMetaMap.set(store.name, { image: store.image }); // osobna mapa na image
  });

  const allDates = Array.from(allDatesSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const chartData = allDates.map((date) => {
    const entry: { [key: string]: number | string | null } = { date };
    storePricesMap.forEach((prices, storeName) => {
      entry[storeName] = prices[date] ?? null;
    });
    return entry;
  });

  const CustomLegend = () => {
    return (
      <ul className="flex flex-wrap gap-4 mt-2">
        {Array.from(storePricesMap.keys()).map((storeName, index) => {
          const meta = storeMetaMap.get(storeName);

          return (
            <li key={storeName} className="flex items-center gap-2 text-sm">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getColor(index) }}
              />
              {meta?.image && (
                <Image
                  src={meta.image}
                  alt={storeName}
                  width={20}
                  height={20}
                  className="rounded-full object-contain"
                />
              )}
              <span className="text-white">{storeName}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full h-96 bg-primary text-white rounded-lg p-4 shadow-lg mt-8">
      <h4 className="sub-header mb-2">Historia cen</h4>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="#ddd" />
          <YAxis stroke="#ddd" unit="zł" />
          <Tooltip />
          <Legend content={<CustomLegend />} />
          {Array.from(storePricesMap.keys()).map((storeName, index) => (
            <Line
              key={storeName}
              type="monotone"
              dataKey={storeName}
              stroke={getColor(index)}
              strokeWidth={2}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
