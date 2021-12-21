/** @jsxImportSource theme-ui */

import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import { Reveal } from "../components/Reveal";

export const Slide2 = () => {
  return (
    <Padding>
      <Reveal
        effect={[
          { color: `hsl(144, 50%, 50%)`, opacity: 0 },
          { color: `hsl(144, 100%, 1%)`, opacity: 1 },
        ]}
        sx={{
          "&>*": {
            display: "inline-block",
            mr: 1,
          },
        }}
        delay={0.5}
      >
        <Text variant="heading">Framer · </Text>
        <Text variant="heading">Canon · </Text>
        <Text variant="heading">Volvo · </Text>
        <Text variant="heading">T-Mobile · </Text>
        <Text variant="heading">Carrefour · </Text>
        <Text variant="heading">The Food Network · </Text>
        <Text variant="heading">Capchase · </Text>
        <Text variant="heading">Maurice Saatchi · </Text>
        <Text variant="heading">Husqvarna · </Text>
        <Text variant="heading">SKF · </Text>
        <Text variant="heading">Teva · </Text>
        <Text variant="heading">Maersk · </Text>
        <Text variant="heading">E.ON · </Text>
        <Text variant="heading">Ascom · </Text>
        <Text variant="heading">SCA · </Text>
        <Text variant="heading">Delhaize · </Text>
      </Reveal>
    </Padding>
  );
};
