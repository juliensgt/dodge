import React from "react";
import ShopOfTheWeek from "@/components/shop/ShopOfTheWeek";
import TabContainer from "./TabContainer";
import ShopOfCoins from "@/components/shop/ShopOfCoins";

/**
 * Shop tab containing:
 * - Shop of the Week
 * - Buy Coins
 */
export default function ShopTab() {
  return (
    <TabContainer>
      <ShopOfTheWeek />
      <ShopOfCoins />
    </TabContainer>
  );
}
