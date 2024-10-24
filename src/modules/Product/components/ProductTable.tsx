import {
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  Badge,
  useBreakpoints,
  type IndexFiltersProps,
  type TabProps,
  Image,
  Button
} from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

// Vất ra ultis
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

interface ProductTableProps {
  data: {
    id: string;
    title: string;
    imageUrl: string;
    createdAt: string;
    rules: any[];
  }[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  console.log(data);

  const [itemStrings, setItemStrings] = useState(["All", "Active", "No rule"]);
  const [queryValue, setQueryValue] = useState("");
  const [rulesOrder, setRulesOrder] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selected, setSelected] = useState(0);
  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => setSelectedStatus(item),
    id: `${item}-${index}`
  }));
  const onCreateNewView = async (value: string) => {
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  const { mode, setMode } = useSetIndexFiltersMode();
  const handleRulesOrderChange = useCallback((value: string[]) => setRulesOrder(value[0]), []);
  const handleFiltersQueryChange = useCallback((value: string) => setQueryValue(value), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filters = [
    {
      key: "rulesOrder",
      label: "Thứ tự Rules",
      filter: (
        <ChoiceList
          title='Thứ tự Rules'
          titleHidden
          choices={[
            { label: "Tăng dần", value: "asc" },
            { label: "Giảm dần", value: "desc" }
          ]}
          selected={rulesOrder ? [rulesOrder] : []}
          onChange={handleRulesOrderChange}
          allowMultiple={false}
        />
      ),
      shortcut: true
    }
  ];

  const appliedFilters: IndexFiltersProps["appliedFilters"] = [];
  if (rulesOrder && !isEmpty(rulesOrder)) {
    const key = "rulesOrder";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, rulesOrder),
      onRemove: () => setRulesOrder(undefined)
    });
  }

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(data);
  const filteredData = data.filter(
    item =>
      item.title.toLowerCase().includes(queryValue.toLowerCase()) &&
      (selectedStatus === "All" ||
        (selectedStatus === "Active" && item.rules.length > 0) ||
        (selectedStatus === "No rule" && item.rules.length === 0))
  );

  const sortedData = filteredData.sort((a, b) =>
    rulesOrder === "asc" ? a.rules.length - b.rules.length : b.rules.length - a.rules.length
  );

  const rowMarkup = sortedData.map(({ id, title, imageUrl, createdAt, rules }, index) => {
    const displayStatus =
      rules.length === 0 ? (
        <Badge tone='enabled'>No Rules</Badge>
      ) : (
        <Badge tone='success'>Active</Badge>
      );
    // const handleAddRules = (id: string) => {
    //   console.log(`Add rules for order ID: ${id}`);
    // };

    return (
      <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
        <IndexTable.Cell>
          <div className='flex items-center gap-4'>
            <Image
              source={imageUrl}
              alt={"image-product"}
              width={75}
              height={75}
              className='rounded-lg'
            />
            <Text variant='bodyMd' fontWeight='medium' as='span'>
              {title}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as='span' alignment='start' numeric>
            {rules.length}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{formatDate(createdAt)}</IndexTable.Cell>
        <IndexTable.Cell>{displayStatus}</IndexTable.Cell>
        <IndexTable.Cell>
          <Button
            // onClick={() => handleAddRules(id)}
            icon={PlusIcon}
          >
            Add Rules
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  return (
    <LegacyCard>
      <IndexFilters
        queryValue={queryValue}
        queryPlaceholder='Searching in all'
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue("")}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <IndexTable
        condensed={useBreakpoints().smDown}
        // resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Product" },
          { title: "Rules(s)" },
          { title: "Last update" },
          { title: "Status" },
          { title: "Payment status" }
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );

  function disambiguateLabel(key: string, value: string | any[]): string {
    switch (key) {
      case "rulesOrder":
        return `Thứ tự rules: ${value}`;
      default:
        return value as string;
    }
  }

  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
};

export default ProductTable;
