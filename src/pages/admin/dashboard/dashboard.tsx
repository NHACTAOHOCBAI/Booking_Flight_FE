/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { Column, Pie } from "@antv/g2plot";
import { useEffect, useRef, useState } from "react";
import { useGetAllAirlines } from "@/hooks/useAirline";
import { useGetAllAirports } from "@/hooks/useAirport";
import { useGetYearDashboard } from "@/hooks/useReport";
import { getPoplarAirlines } from "@/apis/apis/report.api";
import { useGetAllFlights } from "@/hooks/useFlight";
const Dashboard = () => {
  const { data: airlineData } = useGetAllAirlines({});
  const { data: airportData } = useGetAllAirports({});
  const { data: flightData } = useGetAllFlights({});
  return (
    <div className="w-full">
      <div className="w-full flex gap-[10px] justify-between flex-wrap gap-y-2">

        <StaticCard title="Flights" value={flightData?.data.result.length || 0} />
        <StaticCard title="Airlines" value={airlineData?.data.result.length || 0} />
        <StaticCard title="Airports" value={airportData?.data.result.length || 0} />
      </div>

      <div className=" mt-[10px] gap-[10px] flex justify-between flex-wrap gap-y-2">
        <BookingRate />
        <PopularAirline />
      </div>
    </div>
  );
};
const StaticCard = ({ title, value }: { title: string, value: number }) => {
  return (
    <div className="flex-1 drop-shadow-xs min h-[194px] min-w-[250px] bg-white px-[24px] py-[20px]">
      <div className="w-full flex justify-between items-center mb-2">
        <h3 className="opacity-45 h-[32px] flex items-center">{title}</h3>
      </div>
      <p className="text-[30px] font-medium">{value}</p>
    </div>
  );
};
const getMonthName = (month: number): string => {
  const monthNames = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];
  return monthNames[month - 1];
};
const BookingRate = () => {
  const [value, setValue] = useState(2025)
  const { data: bookingRateData } = useGetYearDashboard(value);
  const chartData = bookingRateData?.months.flatMap((item: any) => {
    const monthName = getMonthName(item.month);
    return [
      { name: "Ticket", 月份: monthName, 月均降雨量: item.maxTickets },
      { name: "Booking", 月份: monthName, 月均降雨量: item.ticketsSold },
    ];
  });

  const chartRef = useRef<HTMLDivElement>(null);
  const onChange = (value: number) => {
    setValue(value)
  }
  useEffect(() => {
    if (chartRef.current) {
      const stackedColumnPlot = new Column(chartRef.current, {
        data: chartData || [],
        isGroup: true,
        xField: "月份",
        yField: "月均降雨量",
        seriesField: "name",
        label: {
          position: "middle",
          layout: [
            { type: "interval-adjust-position" },
            { type: "interval-hide-overlap" },
            { type: "adjust-color" },
          ],
        },
      });

      stackedColumnPlot.render();

      return () => {
        stackedColumnPlot.destroy();
      };
    }
  }, [value, bookingRateData, chartData]);

  return (
    <div className="flex-5 min-w-[400px] w-full p-[10px] bg-white drop-shadow-xs">
      <div className="h-[56px] flex items-center text-[16px] font-medium justify-between">
        <h2>Booking Rate Overview</h2>
        <Select
          onChange={onChange}
          defaultValue={2025}
          style={{ minWidth: 90 }}
          options={[
            { value: 2025, label: <span>2025</span> },
            { value: 2024, label: <span>2024</span> },
            { value: 2023, label: <span>2023</span> },
          ]}
        />
      </div>
      <div ref={chartRef} className="h-[400px]" />
    </div>
  );
};


const PopularAirline = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chartRef.current) return;

    const fetchPopularAirlines = async () => {
      const response = await getPoplarAirlines();
      // BE tra ve API  ni
      const popularAirlines: { type: string, value: number }[] = [];

      const d = response.data;

      if (d.airline1?.percentage !== 0) {
        popularAirlines.push({
          type: d.airline1.airlineName,
          value: d.airline1.percentage,
        });
      }

      if (d.airline2?.percentage !== 0) {
        popularAirlines.push({
          type: d.airline2.airlineName,
          value: d.airline2.percentage,
        });
      }

      if (d.otherAirlines?.percentage !== 0) {
        popularAirlines.push({
          type: 'Other',
          value: d.otherAirlines.percentage,
        });
      }

      const piePlot = new Pie(chartRef.current!, {
        appendPadding: 10,
        data: popularAirlines, // Dùng data đã fetch
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'Popular\nAirlines',
          },
        },
      });

      piePlot.render();

      // Cleanup khi unmount
      return () => {
        piePlot.destroy();
      };
    };

    fetchPopularAirlines();
  }, []);


  return (
    <div className="flex-2 min-w-[400px] bg-white drop-shadow-xs p-[10px]">
      <div className="h-[56px] flex items-center text-[16px] font-medium justify-between">
        <h2>Popular Airlines</h2>
      </div>
      <div ref={chartRef} className="h-[400px] w-full" />
    </div>
  );
};


export default Dashboard;
