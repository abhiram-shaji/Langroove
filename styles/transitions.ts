// transitions.ts
import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

// Custom fade transition
export const useTransition = {
  cardStyleInterpolator: ({ current }: { current: any }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  }),
  transitionSpec: {
    open: { animation: "timing", config: { duration: 300 } } as TransitionSpec,
    close: { animation: "timing", config: { duration: 300 } } as TransitionSpec,
  },
};

// Using built-in Fade preset (Optional)
export const fadeFromBottomPreset = TransitionPresets.FadeFromBottomAndroid;
