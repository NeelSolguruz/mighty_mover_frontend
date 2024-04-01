type FormData = {
    name: string;
    mobileNumber: string;
    city: string;
    vehicle: string;
    sources: string
}
interface FAQItem {
    QUESTION: string;
    ANSWER: string;
  }
  
  interface FAQAccordionProps {
    ENTERPRISE_FAQ: FAQItem[];
  }

export type {FormData,FAQItem,FAQAccordionProps}
