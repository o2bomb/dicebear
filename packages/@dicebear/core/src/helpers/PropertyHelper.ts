import { Builder } from '../Builder.js';
import { Prng } from '../Prng.js';
import { OptionsCollection } from '../collections/OptionsCollection.js';
import { ColorModel } from '../models/ColorModel.js';
import { ColorHelper } from './ColorHelper.js';
import { StringHelper } from './StringHelper.js';

export class PropertyHelper {
  public static fillProperties(
    builder: Builder,
    options: OptionsCollection,
  ): void {
    const prng = Prng.fromSeed(options.get('seed') as string);

    this.fillCoreProperties(builder, options, prng);
    this.fillColorProperties(builder, options, prng);
    this.fillComponentProperties(builder, options, prng);
  }

  public static fillCoreProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const properties = builder.getProperties();

    const seed = options.getString('seed');
    const size = options.get('size');

    const backgroundColor = prng.pick(
      options.getArray('backgroundColor') as string[],
    );

    const backgroundColorModel = backgroundColor
      ? new ColorModel(backgroundColor)
      : null;

    properties.set('initials', StringHelper.getInitials(seed));
    properties.set('seed', seed);
    properties.set('flip', options.getBoolean('flip'));
    properties.set('rotate', options.getNumber('rotate'));
    properties.set('scale', options.getNumber('scale'));
    properties.set('radius', options.getNumber('radius'));
    properties.set('size', typeof size === 'number' ? size : null);
    properties.set('backgroundColor', backgroundColorModel);
    properties.set('translateX', options.getNumber('translateX'));
    properties.set('translateY', options.getNumber('translateY'));
    properties.set('clip', options.getBoolean('clip'));
    properties.set('randomizeIds', options.getBoolean('randomizeIds'));
  }

  public static fillColorProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const style = builder.getStyle();
    const properties = builder.getProperties();

    for (const color of style.getColors()) {
      const propertyKey = `${color.name}Color`;

      if (properties.has(propertyKey)) {
        // Ignore colors that are already set. `backgroundColor` for example is
        // filled in `fillCoreProperties`
        continue;
      }

      const optionValue = options.getArray(`${color.name}Color`) as string[];

      let availableColors = optionValue.map((c) => new ColorModel(c));

      if (color.notEqualTo) {
        for (const notEqualTo of color.notEqualTo) {
          const notEqualToColor = properties.get(`${notEqualTo}Color`);

          if (notEqualToColor instanceof ColorModel) {
            const newAvailableColors = availableColors.filter(
              (color) => notEqualToColor.getHex() !== color.getHex(),
            );

            if (newAvailableColors.length > 0) {
              availableColors = newAvailableColors;
            }
          }
        }
      }

      if (color.contrastTo) {
        const contrastTo = properties.get(`${color.contrastTo}Color`);

        if (contrastTo instanceof ColorModel) {
          const colorValue = ColorHelper.getContrastColor(
            contrastTo,
            availableColors,
          );

          if (colorValue) {
            availableColors = [colorValue];
          }
        }
      }

      properties.set(propertyKey, prng.pick(availableColors, null));
    }
  }

  public static fillComponentProperties(
    builder: Builder,
    options: OptionsCollection,
    prng: Prng,
  ): void {
    const style = builder.getStyle();
    const properties = builder.getProperties();

    for (const component of style.getComponents()) {
      const componentOption = options.getArray(component.name) as string[];

      properties.set(component.name, prng.pick(componentOption));

      if (component.probability !== undefined) {
        const componentProbabilityOption = options.getNumber(
          `${component.name}Probability`,
        );

        if (prng.bool(componentProbabilityOption)) {
          properties.set(`${component.name}Probability`, 100);
        } else {
          properties.set(`${component.name}Probability`, 0);
          properties.set(component.name, null);
        }
      }

      if (component.rotation !== undefined) {
        const componentRotationOption = options.getArray(
          `${component.name}Rotation`,
        ) as number[];

        properties.set(
          `${component.name}Rotation`,
          prng.integer(
            Math.min(...componentRotationOption),
            Math.max(...componentRotationOption),
          ),
        );
      }

      if (component.offset?.x !== undefined) {
        const componentOffsetXOption = options.getArray(
          `${component.name}OffsetX`,
        ) as number[];

        properties.set(
          `${component.name}OffsetX`,
          prng.integer(
            Math.min(...componentOffsetXOption),
            Math.max(...componentOffsetXOption),
          ),
        );
      }

      if (component.offset?.y !== undefined) {
        const componentOffsetYOption = options.getArray(
          `${component.name}OffsetY`,
        ) as number[];

        properties.set(
          `${component.name}OffsetY`,
          prng.integer(
            Math.min(...componentOffsetYOption),
            Math.max(...componentOffsetYOption),
          ),
        );
      }
    }
  }
}
