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
interface notification_interface {
  title: string;
  description: string;
  created_at: string;
  id: string;
}
interface userSelectInterface {
  vehicle_id: string;
  vehicle_type: string;
  total_amount: string;
  max_weight: string;
  length: string;
  height: string;
}
interface category_interface {
  id: string;
  name: string;
}
export type {
  category_interface,
  userSelectInterface,
  notification_interface,
  FormData,
  FAQItem,
  FAQAccordionProps,
  documentData,
  serviceType,
  coupon,
};
