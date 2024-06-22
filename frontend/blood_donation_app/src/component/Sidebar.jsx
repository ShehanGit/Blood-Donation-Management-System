import React from 'react';

import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


const SideBar = () => {

    return (
        <div>
            <Sidebar aria-label="Sidebar with content separator example"  >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/donerlist" icon={HiViewBoards}>
            Doner List
          </Sidebar.Item>
          <Sidebar.Item href="/apoinmentlist" icon={HiInbox}>
            Apointments
          </Sidebar.Item>
          <Sidebar.Item href="/Recipients" icon={HiUser}>
          Recipients
          </Sidebar.Item>
          <Sidebar.Item href="/bloodInventory" icon={HiShoppingBag}>
          blood inventory
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
          Donation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
        </div>
    );
};

export default SideBar;
