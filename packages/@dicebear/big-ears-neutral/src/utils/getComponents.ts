import type { Prng } from '@dicebear/core';
import type { Options } from '../options';
import type { ComponentPickCollection } from '../static-types';
import { pickComponent } from './pickComponent';

type Props = {
  prng: Prng;
  options: Options;
};

export function getComponents({
  prng,
  options,
}: Props): ComponentPickCollection {
  const mouthComponent = pickComponent({
    prng,
    group: 'mouth',
    values: options.mouth,
  });
  const eyesComponent = pickComponent({
    prng,
    group: 'eyes',
    values: options.eyes,
  });
  const cheekComponent = pickComponent({
    prng,
    group: 'cheek',
    values: options.cheek,
  });
  const noseComponent = pickComponent({
    prng,
    group: 'nose',
    values: options.nose,
  });

  return {
    mouth: mouthComponent,
    eyes: eyesComponent,
    cheek: prng.bool(options.cheekProbability) ? cheekComponent : undefined,
    nose: noseComponent,
  };
}
