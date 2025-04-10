"use client";
import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons/lib/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { redirect } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'dashboarrd',
    children: [
      { key: '11', label: 'dashboard' },
    ],
  },
  // {
  //   key: '2',
  //   icon: <AppstoreOutlined />,
  //   label: 'Navigation Two',
  //   children: [
  //     { key: '21', label: 'Option 1' },
  //     { key: '22', label: 'Option 2' },
  //     {
  //       key: '23',
  //       label: 'Submenu',
  //       children: [
  //         { key: '231', label: 'Option 1' },
  //         { key: '232', label: 'Option 2' },
  //         { key: '233', label: 'Option 3' },
  //       ],
  //     },
  //     {
  //       key: '24',
  //       label: 'Submenu 2',
  //       children: [
  //         { key: '241', label: 'Option 1' },
  //         { key: '242', label: 'Option 2' },
  //         { key: '243', label: 'Option 3' },
  //       ],
  //     },
  //   ],
  // },
  ];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
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

const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
      // setStateOpenPaths(
        
      // )
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
const onClick: MenuProps['onClick'] = (e) => {
    // Find the clicked item in your items array
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
  redirect(`/${label}`);  
};
  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

export default App;