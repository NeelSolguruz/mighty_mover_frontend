type FormData = {
  name: string;
  email: string;
  contact: string;
  shift: string;
  password: string;
};

type documentData = {
  aadhar: File | null;
  licence: File | null;
  pancard: File | null;
  image: File | null;
};

interface FAQItem {
  QUESTION: string;
  ANSWER: string;
}

interface FAQAccordionProps {
  ENTERPRISE_FAQ: FAQItem[];
}
interface serviceType {
  service_type: string;
}
interface coupon {
  id: string;
  coupon_code: string;
  coupon_type: string;
  description: string;
  discount_type: string;
  discount_value: number;
  expiry_date: string;
  status: string | boolean;
  max_usage_count: number;
}
export type {
  FormData,
  FAQItem,
  FAQAccordionProps,
  documentData,
  serviceType,
  coupon,
};
