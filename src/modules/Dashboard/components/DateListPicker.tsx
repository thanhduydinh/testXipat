import { Button, OptionList, Popover } from "@shopify/polaris";
import { CalendarIcon } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";

interface DateListPickerProps {
  onSelectDays: (days: number | null) => void;
}

const ranges = [
  {
    title: "Yesterday",
    alias: "yesterday",
    days: 2,
    period: {
      since: "yesterday",
      until: "yesterday"
    }
  },
  {
    title: "Last 4 days",
    alias: "last3days",
    days: 3,
    period: {
      since: "-3d",
      until: "-1d"
    }
  },
  {
    title: "Last 7 days",
    alias: "last7days",
    days: 6,
    period: {
      since: "-7d",
      until: "-1d"
    }
  },
  {
    title: "Last 10 days",
    alias: "last10days",
    days: 9,
    period: {
      since: "-10d",
      until: "-1d"
    }
  },
  {
    title: "Last 14 days",
    alias: "last14days",
    days: 13,
    period: {
      since: "-14d",
      until: "-1d"
    }
  }
];

function DateListPicker({ onSelectDays }: DateListPickerProps) {
  const [selected, setSelected] = useState(ranges[2]);
  const [popoverActive, setPopoverActive] = useState(false);

  useEffect(() => {
    onSelectDays(selected.days);
  }, [selected]);

  return (
    <Popover
      autofocusTarget='none'
      preferredAlignment='left'
      preferInputActivator={false}
      preferredPosition='below'
      activator={
        <Button onClick={() => setPopoverActive(!popoverActive)} icon={CalendarIcon}>
          {selected.title}
        </Button>
      }
      active={popoverActive}
      onClose={() => setPopoverActive(false)}
    >
      <OptionList
        options={ranges.map(range => ({
          value: range.alias,
          label: range.title
        }))}
        selected={[selected.alias]}
        onChange={value => {
          const selectedRange = ranges.find(range => range.alias === value[0])!;
          setSelected(selectedRange);
          onSelectDays(selectedRange.days);
          setPopoverActive(false);
        }}
      />
    </Popover>
  );
}

export default DateListPicker;
