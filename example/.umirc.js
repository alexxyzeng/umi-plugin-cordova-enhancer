import { join } from 'path';

export default {
  routes: [
    { path: '/', component: './index' },
  ],
  plugins: [
    join(__dirname, '..', require('../package').main || 'index.js'),
    {
      configPath: resolve(__dirname, 'config.xml'),
      config: {
        id: 'com.dfocus.cmb.fmapp',
        version: '1.0.0',
        name: 'fmapp',
        description: 'fmapp',
        author: {
          email: 'xxx@df.com',
          href: '#',
          name: 'xxx'
        },
        permissions: [{
          type: 'camera',
          desc: 'use camera',
        }, {
          type: 'photo',
          desc: 'use photo'
        }, {
          type: 'location',
          desc: 'use location'
        }, {
          type: 'microphone',
          desc: 'use microphone'
        }],
      }
    },
    resPath: __dirname + 'res'
  ],
}
