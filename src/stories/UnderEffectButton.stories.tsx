import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UnderEffect } from "./Buttons/UnderEffect";

export default {
  title: "E-pokemon/BtnUnderEffect",
  component: UnderEffect,
} as ComponentMeta<typeof UnderEffect>;

const Template: ComponentStory<typeof UnderEffect> = (args) => (
  <UnderEffect {...args} />
);

export const primary = Template.bind({});

primary.args = {
  label: "Pokédex",
};
