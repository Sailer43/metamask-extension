import React from 'react';

import MFA from './MFA.component';

export default {
  title: 'Components/UI/MFA',
  id: __filename,
  component: MFA,
  argTypes: {
    clientId: { control: 'text' },
    apiHost: { control: 'text' },
    clientSecret: { control: 'text' },
    redirectUrl: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    children: 'MFA children',
  },
};

export const DefaultStory = (args) => <MFA {...args}>{args.children}</MFA>;

DefaultStory.storyName = 'Default';

DefaultStory.args = {
  redirectUrl: 'http://127.0.0.1:3000',
  children: 'Submit',
};
