import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../utils/factory";
import web3 from "../utils/web3";
import { useRouter } from "next/router";

function CampaignNew() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <Layout>
      <h3>Create a New Campaign</h3>
      <Form onSubmit={onSubmit} error={!!message}>
        <Message error header="Oops!" content={message} />

        <Form.Field>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Button primary loading={loading}>
          Create Campaign
        </Button>
      </Form>
    </Layout>
  );

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("");
      setLoading(true);

      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      setMessage("Transaction was successful!");
      setLoading(false);

      router.push(`/`);
    } catch (err) {
      console.log(err);
      setMessage(err.message);
      setLoading(false);
    }
  }
}

export default CampaignNew;
