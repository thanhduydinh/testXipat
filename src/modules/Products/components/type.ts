export interface Rule {
  buyFrom: number;
  buyTo: number;
  discountPerItem: number;
}

export interface ProductDataProps {
  id: string;
  title: string;
  price: number;
  description: string;
  titleCampaign?: string;
  imageUrl: string;
  createdAt: string;
  startDate?: number;
  endDate?: number;
  rules: Rule[];
}

export interface ProductTableProps {
  data: ProductDataProps[];
  onDataChange: () => void;
}

export interface AddRulesModalProps {
  isActive: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductDataProps) => Promise<void>;
  productData: ProductDataProps | null;
}

export interface FormDataProps {
  titleCampaign: string;
  startDate: string;
  endDate: string;
  rules: {
    buyFrom: number;
    buyTo: number;
    discountPerItem: number;
  }[];
  errors: {
    titleCampaign: string;
    startDate: string;
    endDate: string;
    [key: string]: string;
  };
}

export interface AddProductModalProps {
  isActive: boolean;
  onClose: () => void;
  onSubmit: (productData: ProductDataProps) => Promise<void>;
}
