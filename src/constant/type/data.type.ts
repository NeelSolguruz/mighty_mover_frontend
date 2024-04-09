// import { StaticImageData } from "next/image";

type FormData = {
  name: string;
  mobileNumber: string;
  email: string;
  city: string;
  vehicle: string;
  sources: string;
  image1: File | undefined;
  image2: File | undefined;
  image3: File | undefined;
};
interface FAQItem {
    QUESTION: string;
    ANSWER: string;
  }
  
  interface FAQAccordionProps {
    ENTERPRISE_FAQ: FAQItem[];
  }

export type {FormData,FAQItem,FAQAccordionProps}
