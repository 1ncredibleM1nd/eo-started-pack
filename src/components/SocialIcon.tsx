import {
  SocialIconFacebook,
  SocialIconInstagram,
  SocialIconOk,
  SocialIconTelegram,
  SocialIconVk,
} from "@/images/icons";
import { observer } from "mobx-react-lite";

type TProps = {
  social: string;
  size: number;
};

export const SocialIcon = observer(({ social, size }: TProps) => {
  if (social === "facebook") {
    return <SocialIconFacebook width={size} height={size} />;
  }
  if (social === "instagram") {
    return <SocialIconInstagram width={size} height={size} />;
  }
  if (social === "telegram") {
    return <SocialIconTelegram width={size} height={size} />;
  }
  if (social === "vkontakte") {
    return <SocialIconVk width={size} height={size} />;
  }
  if (social === "odnoklassniki") {
    return <SocialIconOk width={size} height={size} />;
  }
});
