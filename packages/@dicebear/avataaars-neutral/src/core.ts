/**
 * Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
 *
 * Plugin: https://www.figma.com/community/plugin/1005765655729342787
 * File: https://www.figma.com/file/HBLdITkkTnLs4M09BmCe4h/%40dicebear%2Favataaars?node-id=20%3A299
 */

import type { Style, StyleSchema } from '@dicebear/core';
import { escape } from '@dicebear/core';

import type { Options } from './types.js';
import { schema } from './schema.js';
import { getComponents } from './utils/getComponents.js';
import { getColors } from './utils/getColors.js';
import { onPreCreate } from './hooks/onPreCreate.js';
import { onPostCreate } from './hooks/onPostCreate.js';

export const style: Style<Options> = {
  meta: {
    title: 'Avataaars',
    creator: 'Pablo Stanley',
    source: 'https://avataaars.com/',
    homepage: 'https://twitter.com/pablostanley',
    license: {
      name: 'Free for personal and commercial use.',
      url: 'https://avataaars.com/',
    },
  },
  schema: schema as StyleSchema,
  create: ({ prng, options }) => {
    onPreCreate({ prng, options });

    const components = getComponents({ prng, options });
    const colors = getColors({ prng, options });

    onPostCreate({ prng, options, components, colors });

    return {
      attributes: {
        viewBox: '0 0 112 112',
        fill: 'none',
        'shape-rendering': 'auto'
      },
      body: `<g transform="translate(2 63)">${components.mouth?.value(components, colors) ?? ''}</g><g transform="translate(28 51)">${components.nose?.value(components, colors) ?? ''}</g><g transform="translate(0 19)">${components.eyes?.value(components, colors) ?? ''}</g><g transform="translate(0 11)">${components.eyebrows?.value(components, colors) ?? ''}</g>`,
    };
  },
};