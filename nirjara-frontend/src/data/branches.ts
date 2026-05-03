export type Branch = {
  number: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  tag: string;
  mapUrl: string;
};

export const branches: Branch[] = [
  {
    number: "01",
    name: "Chabahil Branch",
    address: "Chunne Bhairab Marg, Chabahil, Kathmandu 44600",
    hours: "8:30 AM – 10:00 PM · Open Daily",
    phone: "+977 985-1097472",
    tag: "Main Branch · Est. 2013",
    mapUrl:
      "https://maps.google.com/?cid=5294540498943371996",
  },
  {
    number: "02",
    name: "Rabibhawan Branch",
    address: "Rabibhawan, Kalanki–Kalimati Road, Kathmandu",
    hours: "8:30 AM – 10:00 PM · Open Daily",
    phone: "+977 980-4720733",
    tag: "New Branch · Kalanki",
    mapUrl:
      "https://maps.google.com/?q=Nirjara+Beauty+Salon+Rabibhawan+Kalanki+Kathmandu",
  },
];