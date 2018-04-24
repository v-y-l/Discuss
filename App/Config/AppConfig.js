// Simple React Native specific changes

let apiUrl = 'https://apps.api.nextjump.com';

if (__DEV__) {
  // apiUrl = 'https://dev-otter.api.nextjump.com';
  apiUrl = 'http://192.168.56.103:8081';
}

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseUrl: apiUrl,
  useFixture: true,
};
