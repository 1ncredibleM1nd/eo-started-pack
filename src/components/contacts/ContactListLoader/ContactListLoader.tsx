import "./ContactListLoader.scss";
import { observer } from "mobx-react-lite";
import { useClassName } from "@/hooks/useClassName";
import PuffLoader from "react-spinners/PuffLoader";

export const ContactListLoader = observer(() => {
  const { cn } = useClassName("contact-list-loader");

  return (
    <div className={cn()}>
      <PuffLoader color="#3498db" size={50} />
    </div>
  );
});
