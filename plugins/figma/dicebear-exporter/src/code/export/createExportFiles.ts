import { templates } from '../templates';
// @ts-ignore
import * as handlebars from 'handlebars/dist/cjs/handlebars.js';
import { createTemplateString } from './createTemplateString';
import { Export } from '../types';
import { createExportJsonSchema } from './createExportJsonSchema';
import { objectMap } from '../utils/objectMap';

handlebars.registerHelper('isDefined', function (val: unknown, options: unknown) {
  if (val !== undefined) {
    // @ts-ignore
    return options.fn(this);
  }

  // @ts-ignore
  return options.inverse(this);
});

handlebars.registerHelper('isNull', function (val: unknown, options: unknown) {
  if (val === null) {
    // @ts-ignore
    return options.fn(this);
  }

  // @ts-ignore
  return options.inverse(this);
});

handlebars.registerHelper('isEqual', function (val: unknown, val2: unknown, options: unknown) {
  if (val === val2) {
    // @ts-ignore
    return options.fn(this);
  }

  // @ts-ignore
  return options.inverse(this);
});

export async function createExportFiles(exportData: Export) {
  const isMitLicensed = exportData.frame.settings.licenseName && exportData.frame.settings.licenseName === 'MIT';
  const componentsDimensions = objectMap(exportData.components, (val) => {
    const componentNode = figma.getNodeById(Object.values(val.collection)[0].id) as ComponentNode;

    return {
      width: componentNode.width,
      height: componentNode.height,
    };
  });

  const files: Record<string, string> = {
    '.editorconfig': templates['.editorconfig'],
    '.gitignore': templates['.gitignore'],
    '.prettierignore': templates['.prettierignore'],
    '.prettierrc': templates['.prettierrc'],
    LICENSE: handlebars.compile(templates['LICENSE'])({
      year: new Date().getFullYear(),
      creator: exportData.frame.settings.creator,
      contributor: exportData.frame.settings.contributor,
      isMitLicensed,
    }),
    'jest.config.js': templates['jest.config.js'],
    'package.json': handlebars.compile(templates['package.json'])({
      packageName: exportData.frame.settings.packageName,
      packageVersion: exportData.frame.settings.packageVersion,
    }),
    'tsconfig.json': templates['tsconfig.json'],
    'tests/create.test.ts': templates['tests/create.test.ts'],
    'tests/preview.test.ts': handlebars.compile(templates['tests/preview.test.ts'])({
      components: exportData.components,
      colors: exportData.colors,
    }),
    'src/index.ts': handlebars.compile(templates['src/index.ts'])({
      title: exportData.frame.settings.title,
      year: new Date().getFullYear(),
      packageName: exportData.frame.settings.packageName,
      creator: exportData.frame.settings.creator,
      licenseName: exportData.frame.settings.licenseName,
      licenseUrl: exportData.frame.settings.licenseUrl,
      contributor: exportData.frame.settings.contributor,
      sourceTitle: exportData.frame.settings.sourceTitle,
      source: exportData.frame.settings.source,
      isMitLicensed,
    }),
    'src/core.ts': handlebars.compile(templates['src/core.ts'])({
      creator: exportData.frame.settings.creator,
      licenseName: exportData.frame.settings.licenseName,
      licenseUrl: exportData.frame.settings.licenseUrl,
      contributor: exportData.frame.settings.contributor,
      sourceTitle: exportData.frame.settings.sourceTitle,
      source: exportData.frame.settings.source,
      backgroundColorGroupName: exportData.frame.settings.backgroundColorGroupName,
      components: exportData.components,
      colors: exportData.colors,
      size: (figma.getNodeById(exportData.frame.id) as FrameNode).width,
      body: await createTemplateString(exportData, figma.getNodeById(exportData.frame.id) as FrameNode),
      shapeRendering: exportData.frame.settings.shapeRendering,
    }),
    'src/static-types.ts': templates['src/static-types.ts'],
    'src/meta/components.ts': handlebars.compile(templates['src/meta/components.ts'])({
      components: componentsDimensions,
    }),
    'src/colors/index.ts': handlebars.compile(templates['src/colors/index.ts'])({
      colors: exportData.colors,
      backgroundColorGroupName: exportData.frame.settings.backgroundColorGroupName,
    }),
    'src/components/index.ts': handlebars.compile(templates['src/components/index.ts'])({
      components: exportData.components,
    }),
    'src/utils/getColors.ts': handlebars.compile(templates['src/utils/getColors.ts'])({
      colors: exportData.colors,
      backgroundColorGroupName: exportData.frame.settings.backgroundColorGroupName,
    }),
    'src/utils/getComponents.ts': handlebars.compile(templates['src/utils/getComponents.ts'])({
      components: exportData.components,
    }),
    'src/utils/pickColor.ts': templates['src/utils/pickColor.ts'],
    'src/utils/pickComponent.ts': templates['src/utils/pickComponent.ts'],
    'src/hooks/onPreCreate.ts': handlebars.compile(templates['src/hooks/onPreCreate.ts'])({
      content: exportData.frame.settings.onPreCreateHook.replace(/\n/g, '\n  '),
    }),
    'src/hooks/onPostCreate.ts': handlebars.compile(templates['src/hooks/onPostCreate.ts'])({
      content: exportData.frame.settings.onPostCreateHook.replace(/\n/g, '\n  '),
    }),
  };

  const schema = createExportJsonSchema(exportData);

  // Components
  const componentTemplate = handlebars.compile(templates['src/components/{{name}}.ts']);

  for (const componentGroupName in exportData.components) {
    if (false === exportData.components.hasOwnProperty(componentGroupName)) {
      continue;
    }

    const componentGroup = exportData.components[componentGroupName];
    const components: Record<string, string> = {};

    for (const componentName in componentGroup.collection) {
      if (false === componentGroup.collection.hasOwnProperty(componentName)) {
        continue;
      }

      const componentNode = figma.getNodeById(componentGroup.collection[componentName].id) as ComponentNode;

      components[componentName] = await createTemplateString(exportData, componentNode);
    }

    files[`src/components/${componentGroupName}.ts`] = componentTemplate({
      name: componentGroupName,
      components,
    });
  }

  // Colors
  const colorTemplate = handlebars.compile(templates['src/colors/{{name}}.ts']);

  for (const colorGroupName in exportData.colors) {
    if (false === exportData.colors.hasOwnProperty(colorGroupName)) {
      continue;
    }

    const colorGroup = exportData.colors[colorGroupName];

    if (
      false === colorGroup.isUsedByComponents &&
      colorGroupName !== exportData.frame.settings.backgroundColorGroupName
    ) {
      continue;
    }

    files[`src/colors/${colorGroupName}.ts`] = colorTemplate({
      name: colorGroupName,
      colors: colorGroup.collection,
    });
  }

  // Schema JSON
  files[`src/schema.json`] = JSON.stringify(schema);

  // Readme
  files['README.md'] = handlebars.compile(templates['README.md'])({
    title: exportData.frame.settings.title,
    sourceTitle: exportData.frame.settings.sourceTitle,
    source: exportData.frame.settings.source,
    creator: exportData.frame.settings.creator,
    licenseName: exportData.frame.settings.licenseName,
    licenseUrl: exportData.frame.settings.licenseUrl,
    packageName: exportData.frame.settings.packageName,
    packageVersionMajor: exportData.frame.settings.packageVersion.split('.')[0] ?? '0',
    packageNameLastPart: exportData.frame.settings.packageName.split('/').pop() ?? '',
    properties: schema.properties,
    isDicebearNamespace: exportData.frame.settings.packageName.split('/')[0] === '@dicebear',
    isMitLicensed,
  });

  return files;
}