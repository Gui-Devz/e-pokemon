import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageModal } from "./Modals/MessageModal";

export default {
  title: "E-pokemon/MessageModal",
  component: MessageModal,
} as ComponentMeta<typeof MessageModal>;

const Template: ComponentStory<typeof MessageModal> = (args) => (
  <MessageModal {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
