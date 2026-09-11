import { Customer, Address } from "@/lib/types";
import { MOCK_CUSTOMER, MOCK_ADDRESSES } from "@/lib/mock/customer";

let dynamicCustomer: Customer = { ...MOCK_CUSTOMER };
let dynamicAddresses: Address[] = [...MOCK_ADDRESSES];

/**
 * Get current authenticated customer details
 * Ready for replacement with /wp-json/wc/v3/customers/me
 */
export async function getCurrentCustomer(): Promise<Customer> {
  return {
    ...dynamicCustomer,
    addresses: [...dynamicAddresses],
  };
}

/**
 * Update customer profile
 */
export async function updateCustomerProfile(
  data: Partial<Pick<Customer, "name" | "email" | "phone">>
): Promise<Customer> {
  dynamicCustomer = {
    ...dynamicCustomer,
    ...data,
  };
  return { ...dynamicCustomer, addresses: [...dynamicAddresses] };
}

/**
 * Get customer saved addresses
 */
export async function getCustomerAddresses(): Promise<Address[]> {
  return [...dynamicAddresses];
}

/**
 * Add a new address
 */
export async function addCustomerAddress(newAddress: Omit<Address, "id">): Promise<Address> {
  const address: Address = {
    ...newAddress,
    id: `addr-${Date.now()}`,
  };

  if (address.isDefault) {
    dynamicAddresses = dynamicAddresses.map((a) => ({ ...a, isDefault: false }));
  }

  dynamicAddresses.push(address);
  return address;
}

/**
 * Update existing address
 */
export async function updateCustomerAddress(
  id: string,
  updatedFields: Partial<Address>
): Promise<Address | null> {
  const index = dynamicAddresses.findIndex((a) => a.id === id);
  if (index === -1) return null;

  if (updatedFields.isDefault) {
    dynamicAddresses = dynamicAddresses.map((a) => ({ ...a, isDefault: false }));
  }

  dynamicAddresses[index] = {
    ...dynamicAddresses[index],
    ...updatedFields,
  };

  return dynamicAddresses[index];
}

/**
 * Delete an address
 */
export async function deleteCustomerAddress(id: string): Promise<boolean> {
  const initialLength = dynamicAddresses.length;
  dynamicAddresses = dynamicAddresses.filter((a) => a.id !== id);
  return dynamicAddresses.length < initialLength;
}
