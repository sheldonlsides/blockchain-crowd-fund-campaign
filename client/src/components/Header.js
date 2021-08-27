import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import Link from "next/link";

export default class HeaderMenu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

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
            <Icon name="add circle" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
