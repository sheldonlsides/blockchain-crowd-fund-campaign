import React, { Component } from "react";
import factory from "./utils/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout.js";
import Link from "next/link";
import { useRouter } from "next/router";

function CampaignIndex({ campaigns }) {
  const router = useRouter();

  return (
    <Layout>
      <h1>Campaigns Index</h1>
      <div>
        <Button
          style={{ marginTop: "15px" }}
          floated="right"
          content="Create campaign"
          icon="add circle"
          primary
          onClick={createRoute}
        />
        <div>{renderCampaigns(campaigns)}</div>
      </div>
    </Layout>
  );

  function createRoute() {
    router.push("/campaigns/new");
  }
}

export async function getStaticProps(ctx) {
  const campaigns = await factory.methods.getDeployedContracts().call();
  return {
    props: {
      campaigns,
    },
  };
}

function renderCampaigns(campaigns) {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: (
        <Link href={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });

  return <Card.Group items={items}></Card.Group>;
}

export default CampaignIndex;
