import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SidedCartModal } from "./Modals/SidedCartModal";

export default {
  title: "E-pokemon/SidedCartModal",
  component: SidedCartModal,
} as ComponentMeta<typeof SidedCartModal>;

const Template: ComponentStory<typeof SidedCartModal> = (args) => (
  <SidedCartModal {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Pokédex",
};
