/** @jsxImportSource theme-ui */

import { Text } from "@theme-ui/components";
import { Padding } from "../components/Padding";
import Reveal from "../components/Reveal";
import { globalStyle } from "../components/globalStyles";

export const SlideClients = () => {
  return (
    <Padding>
      <Reveal
        {...globalStyle.textRevealAnimation}
        sx={{
          "&>*": {
            display: "inline-block",
            mr: 2,
          },
        }}
      >
        <Text variant="heading">Framer · </Text>
        <Text variant="heading">Canon · </Text>
        <Text variant="heading">Volvo · </Text>
        <Text variant="heading">T-Mobile</Text>
        <Text variant="heading">Carrefour · </Text>
        <Text variant="heading">The Food Network</Text>
        <Text variant="heading">Capchase · </Text>
        <Text variant="heading">Maurice Saatchi</Text>
        <Text variant="heading">Husqvarna · </Text>
        <Text variant="heading">SKF · </Text>
        <Text variant="heading">Teva · </Text>
        <Text variant="heading">Maersk</Text>
        <Text variant="heading">E.ON · </Text>
        <Text variant="heading">Ascom · </Text>
        <Text variant="heading">SCA · </Text>
        <Text variant="heading">Delhaize</Text>
      </Reveal>
    </Padding>
  );
};
