// Owned preview — see .design-sync/NOTES.md ("REPO BUG: percentage-width story roots").
//
// slider.stories.tsx gives both stories a `className="w-[60%]"` ROOT under the
// storybook-global `layout: 'centered'`. A percentage width against a
// shrink-to-fit parent resolves to 0px, so those stories are invisible in the
// repo's own storybook and cannot be photographed as a comparison reference —
// they are skipped via cfg.overrides.Slider.skip, which left this card blank
// ([RENDER_BLANK]).
//
// The component itself renders correctly. This file restores a real card by
// mirroring each story's props exactly (Default: [50]; Range: [25, 75]) and
// giving the slider the finite width the story meant to give it.
//
// DELETE THIS FILE once the stories are fixed upstream (add
// `parameters: { layout: 'padded' }` to the meta, or wrap in a fixed-width
// box), then drop the Slider skip and let the generated preview take over.
import * as React from 'react';
import { Slider } from '@e412/rnui-react';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 360, padding: '12px 0' }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
  </Frame>
);

export const Range = () => (
  <Frame>
    <Slider defaultValue={[25, 75]} max={100} step={1} className="w-full" />
  </Frame>
);
