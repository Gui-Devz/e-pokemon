import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AddToCartButton } from "./Buttons/AddToCartButton";

export default {
  title: "E-pokemon/BtnAddToCart",
  component: AddToCartButton,
} as ComponentMeta<typeof AddToCartButton>;

const Template: ComponentStory<typeof AddToCartButton> = (args) => (
  <AddToCartButton {...args} />
);

export const primary = Template.bind({});
