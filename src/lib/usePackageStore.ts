import { create } from "zustand";

export interface PackageStore {
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
}

const usePackageStore = create<PackageStore>((set) => ({
  selectedPackage: "",
  setSelectedPackage: (pkg: string) => set({ selectedPackage: pkg }),
}));

export default usePackageStore;
