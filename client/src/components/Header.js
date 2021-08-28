import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

function HeaderMenu() {
  const router = useRouter();
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Menu.Item>CrowdCoin</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">
            <a>Campaigns</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/campaigns/new">
            <a>
              <Icon name="add circle" />
            </a>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default HeaderMenu;
