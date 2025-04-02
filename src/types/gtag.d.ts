interface GTagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  send_to: string;
  [key: string]: string | number | boolean | undefined; // More specific union type for possible gtag parameters
}

interface Window {
  dataLayer: unknown[];
  gtag: (
    command: "event" | "config" | "js" | "set",
    targetId: string,
    config?: GTagEvent | Date
  ) => void;
}
