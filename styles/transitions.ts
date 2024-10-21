// transitions.ts
import { TransitionPresets } from "@react-navigation/stack";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

// Custom Scale From Center transition
export const useTransition = {
  cardStyleInterpolator: ({ current, layouts }: { current: any; layouts: any }) => ({
    cardStyle: {
      opacity: current.progress, // Fade effect
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.85, 1], // Scale from 85% to 100%
          }),
        },
      ],
    },
  }),
  transitionSpec: {
    open: { animation: "timing", config: { duration: 300 } } as TransitionSpec,
    close: { animation: "timing", config: { duration: 300 } } as TransitionSpec,
  },
};

// Using built-in Fade preset
export const fadeFromBottomPreset = TransitionPresets.FadeFromBottomAndroid;
