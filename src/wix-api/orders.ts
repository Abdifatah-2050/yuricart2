import { WixClient } from "@/lib/wix-client.base";
import type { orders } from "@wix/ecom";

// ✅ Extract correct Order type
export type Order = orders.Order;

export async function getOrder(
  wixClient: WixClient,
  orderId: string,
): Promise<Order | null> {
  try {
    return await wixClient.orders.getOrder(orderId);
  } catch (error) {
    if ((error as any).details?.applicationError?.code === "NOT_FOUND") {
      return null;
    } else {
      throw error;
    }
  }
}

export interface GetUserOrderFilters {
  limit?: number;
  cursor?: string | null;
}

export async function getUserOrders(
  wixClient: WixClient,
  { limit, cursor }: GetUserOrderFilters,
) {
  return wixClient.orders.searchOrders({
    search: {
      cursorPaging: {
        limit,
        cursor,
      },
    },
  });
}
