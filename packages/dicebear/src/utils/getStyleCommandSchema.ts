import type { Style } from '@dicebear/core';
import type { JSONSchema7 } from 'json-schema';

import { schema as coreSchema } from '@dicebear/core';
import mergeAllOf from 'json-schema-merge-allof';

export function getStyleCommandSchema(style: Style<any>): JSONSchema7 {
  return mergeAllOf(
    {
      allOf: [
        {
          properties: {
            count: {
              description: 'Defines how many avatars to create.',
              type: 'number',
              default: 1,
            },
            format: {
              type: 'string',
              enum: ['svg', 'png', 'jpg', 'jpeg', 'webp', 'avif', 'json'],
              default: 'svg',
            },
            exif: {
              description: 'Include Exif Metadata',
              type: 'boolean',
              default: false,
            },
            json: {
              description: 'Save JSON file in addition to image file',
              type: 'boolean',
              default: false,
            },
          },
        },
        coreSchema,
        style.schema ?? {},
      ],
      additionalItems: true,
    },
    { ignoreAdditionalProperties: true }
  );
}
