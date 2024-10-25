import DateListPicker from "./components/DateListPicker";
import LineChart from "./components/LineChart";
import { useState } from "react";
import BarChart from "./components/BarChart";
import { Grid, Text, LegacyCard } from "@shopify/polaris";

const DashBoard = () => {
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleSelectDays = (days: number | null) => {
    setSelectedDays(days);
  };
  const handleTotalSubscriptions = (total: number) => {
    setTotalSubscriptions(total);
  };
  const handleTotalRevenue = (total: number) => {
    setTotalRevenue(total);
  };

  return (
    <div className='bg-white px-6 min-h-svh'>
      <div className='pt-8 pb-6'>
        <Text variant='heading2xl' alignment='start' as='h3'>
          DashBoard
        </Text>
      </div>

      <div className='mb-4'>
        <DateListPicker onSelectDays={handleSelectDays} />
      </div>

      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <LegacyCard title='Subscription' sectioned>
            <div className='text-lg font-semibold'>{totalSubscriptions}</div>
            <LineChart days={selectedDays} onTotalSubscriptions={handleTotalSubscriptions} />
          </LegacyCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <LegacyCard title='Revenue' sectioned>
            <div className='text-lg font-semibold'>${totalRevenue}</div>
            <BarChart days={selectedDays} onTotalRevenue={handleTotalRevenue} />
          </LegacyCard>
        </Grid.Cell>
      </Grid>
    </div>
  );
};
export default DashBoard;
