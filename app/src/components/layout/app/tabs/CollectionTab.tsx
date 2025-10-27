import React from "react";
import MySkins from "@/components/shop/MySkins";
import MyThemes from "@/components/shop/MyThemes";
import Collections from "@/components/shop/Collections";
import TabContainer from "./TabContainer";

/**
 * Collection tab containing:
 * - My Skins
 * - My Themes
 * - Collections
 */
export default function CollectionTab() {
  return (
    <TabContainer>
      <MySkins />
      <MyThemes />
      <Collections />
    </TabContainer>
  );
}
