

type FormData = {
    name: string,
    email: string,
    contact: string,
    shift:string,
    password:string
}

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

export type {FormData,FAQItem,FAQAccordionProps,documentData}
