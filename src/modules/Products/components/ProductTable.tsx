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
  Image,
  Button,
  ButtonGroup,
  Pagination
} from "@shopify/polaris";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AddRulesModal from "./AddRulesModal";
import { deleteProduct, getProducts, updateProduct } from "@/api/product";
import { formatDate } from "@/utils/helpers";
import { ProductDataProps, ProductTableProps } from "./type";

const createTabs = (itemStrings: string[], setSelectedStatus: (status: string) => void) => {
  return itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => setSelectedStatus(item),
    id: `${item}-${index}`
  }));
};

const filterData = (data: ProductDataProps[], queryValue: string, selectedStatus: string) => {
  return data.filter(
    item =>
      item.title.toLowerCase().includes(queryValue.toLowerCase()) &&
      (selectedStatus === "All" ||
        (selectedStatus === "Active" && item.rules.length > 0) ||
        (selectedStatus === "No rule" && item.rules.length === 0))
  );
};

const sortData = (data: ProductDataProps[], rulesOrder?: string) => {
  return data.sort((a, b) =>
    rulesOrder === "asc" ? a.rules.length - b.rules.length : b.rules.length - a.rules.length
  );
};

const createRowMarkup = (
  paginatedData: ProductDataProps[],
  selectedResources: string[],
  formatDate: (dateString: string) => string,
  handleAddRules: (id: string) => void,
  handleDeleteRow: (id: string) => void
) => {
  return paginatedData.map(({ id, title, imageUrl, createdAt, rules }, index) => {
    const displayStatus =
      rules.length === 0 ? (
        <Badge tone='enabled'>No Rules</Badge>
      ) : (
        <Badge tone='success'>Active</Badge>
      );

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
          <div className='flex w-full justify-between gap-4 max-w-24'>
            <ButtonGroup>
              <Button variant='primary' icon={PlusIcon} onClick={() => handleAddRules(id)}>
                Add Rules
              </Button>
            </ButtonGroup>
            <Button
              aria-label='Remove rule'
              icon={DeleteIcon}
              onClick={() => handleDeleteRow(id)}
            ></Button>
          </div>
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });
};

const isEmpty = (value: string | string[]): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
};

const disambiguateLabel = (key: string, value: string): string => {
  switch (key) {
    case "rulesOrder":
      return `Rules order: ${value}`;
    default:
      return value as string;
  }
};

const ProductTable: React.FC<ProductTableProps> = ({ data, onDataChange }) => {
  const [itemStrings, setItemStrings] = useState(["All", "Active", "No rule"]);
  const [queryValue, setQueryValue] = useState("");
  const [rulesOrder, setRulesOrder] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selected, setSelected] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);
  const toggleModal = () => setIsModalActive(!isModalActive);
  const [selectedProduct, setSelectedProduct] = useState<ProductDataProps | null>(null);
  const [page, setPage] = useState(1);

  const tabs = createTabs(itemStrings, setSelectedStatus);

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
      label: "Rules Order",
      filter: (
        <ChoiceList
          title='Rules Order'
          titleHidden
          choices={[
            { label: "Ascending", value: "asc" },
            { label: "Descending", value: "desc" }
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

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(
    data as unknown as Array<{ [key: string]: unknown }>
  );

  const filteredData = filterData(data, queryValue, selectedStatus);
  const sortedData = rulesOrder ? sortData(filteredData, rulesOrder) : filteredData;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleAddRules = async (id: string) => {
    const productData = await getProducts();
    const selectedProduct = productData?.find(product => product.id === id);
    toggleModal();

    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
    } else {
      setSelectedProduct(null);
      console.log(`No product found for ID: ${id}`);
    }
  };

  const handleSubmitRules = async (updatedProductData: Partial<ProductDataProps>) => {
    if (selectedProduct) {
      const updatedProduct = await updateProduct(selectedProduct.id, updatedProductData);
      if (updatedProduct) {
        onDataChange();
        toggleModal();
      } else {
        console.log("Failed to update product.");
      }
    }
  };

  const handleDeleteRow = async (id: string) => {
    await deleteProduct(id);
    onDataChange();
  };

  const rowMarkup = createRowMarkup(
    paginatedData,
    selectedResources,
    formatDate,
    handleAddRules,
    handleDeleteRow
  );

  return (
    <div className='pb-10'>
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
          itemCount={filteredData.length}
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
        <Pagination
          type='table'
          hasPrevious={page > 1}
          hasNext={page < totalPages}
          onPrevious={() => setPage(prev => Math.max(prev - 1, 1))}
          onNext={() => setPage(prev => Math.min(prev + 1, totalPages))}
          label={`Page ${page} of ${totalPages}`}
        />
      </LegacyCard>
      <AddRulesModal
        isActive={isModalActive}
        onClose={toggleModal}
        onSubmit={handleSubmitRules}
        productData={selectedProduct}
      />
    </div>
  );
};

export default ProductTable;
