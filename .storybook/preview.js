/** @type { import('@storybook/react').Preview } */

import '../src/App.scss';


const customViewports  = {
  kabanMobile: {
    name: "kaban-mobile",
    styles: {
      width: '375px',
      height: '667px'
    }
  },
  kabanTablet: {
    name: 'kaban-tablet',
    styles: {
      width: '768px',
      height: '1024px'
    }
  }
}

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    viewport: { viewports: customViewports },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


export const globalTypes = {
  scheme: {
    name: 'Scheme',
    description: "Select light or dark theme",
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: ["light", "dark", "white"],
      dynamicTitle: true
    }
  }
}

export default preview;
