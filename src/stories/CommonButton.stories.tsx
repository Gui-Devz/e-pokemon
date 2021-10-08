import React from "react";
import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";

import { Common } from "./Buttons/Common";

export default {
  title: "E-pokemon/CommonButton",
  component: Common,
} as ComponentMeta<typeof Common>;

const Template: ComponentStory<typeof Common> = (args) => <Common {...args} />;

export const primary = Template.bind({});

primary.args = {
  primary: true,
  label: "Button",
};
