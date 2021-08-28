import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { Button, Card } from "semantic-ui-react";
import Campaign from "../utils/campaign";
import web3 from "../utils/web3";

function CampaignDetails({ summaryObject }) {
  const router = useRouter();

  return (
    <Layout>
      <h3>Campaign Details</h3>
      {renderCards()}
      <Button onClick={router.back} primary style={{ marginTop: "15px" }}>
        Back
      </Button>
    </Layout>
  );

  function renderCards() {
    const items = [
      {
        header: summaryObject.manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign, and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: summaryObject.minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute the minimum amount of wei above to be a contributor and approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: summaryObject.numberOfRequest,
        meta: "Request Count",
        description: "Number of request to withdraw money from contract",
        style: { overflowWrap: "break-word" },
      },
      {
        header: summaryObject.approversCount,
        meta: "Approver Count",
        description:
          "Number of people who have contributed to request and are approvers",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(summaryObject.balance, "ether"),
        meta: "Balance (ether)",
        description: "This is the balance this campaign has left to spend",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { address: "" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const campaign = Campaign(params.address);
  const summary = await campaign.methods.getSummary().call();

  const summaryObject = {
    minimumContribution: summary[0],
    balance: summary[1],
    numberOfRequest: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };

  console.log(summaryObject);
  return {
    props: { summaryObject },
    revalidate: 10,
  };
}

export default CampaignDetails;
