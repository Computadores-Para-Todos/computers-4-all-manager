import { configure } from '@storybook/react';
import 'semantic-ui-css/semantic.css';
// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);
