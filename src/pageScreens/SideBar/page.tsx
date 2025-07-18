"use client";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation"; // ✅ Use this instead of redirect()

type MenuItem = Required<MenuProps>["items"][number];

const reDirectItems = {
  Dashboard: "dashboard",
  "Women's Fashion": "womensfashion",
  "Men's Fashion": "mensfashion",
  Electronics: "electronics",
  "Home & Lifestyle": "home&lifestyle",
  "Add Products (Temperary)": "addproducts",
};

const items: MenuItem[] = [
  {
    key: "1",
    label: "Dashboard",
  },
  {
    key: "2",
    label: `Women's Fashion`,
    children: [{ key: "21", label: `Women's Fashion` }],
  },
  {
    key: "3",
    label: `Men's Fashion`,
    children: [{ key: "31", label: `Men's Fashion` }],
  },
  {
    key: "4",
    label: `Electronics`,
  },
  {
    key: "5",
    label: `Home & Lifestyle`,
  },
  {
    key: "6",
    label: `Add Products (Temperary)`,
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item: any) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const SideBar: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const router = useRouter(); // ✅

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    const findItem = (items: MenuItem[], key: string): MenuItem | undefined => {
      for (const item of items) {
        if (item?.key === key) return item;
        if ((item as any)?.children) {
          const found = findItem((item as any).children, key);
          if (found) return found;
        }
      }
      return undefined;
    };

    const clickedItem = findItem(items, e.key);
    const label = (clickedItem as any)?.label;
    const redirectLink = reDirectItems[label];

    if (redirectLink) {
      router.push(`/${redirectLink}`); // ✅ No reload, client-side routing
    }
  };

  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={["231"]}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

export default SideBar;
