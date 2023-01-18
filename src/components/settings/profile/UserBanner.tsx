import { Dispatch, SetStateAction, useRef } from "react";
import { FileInput } from "../../../utils/styles";
import { SettingsProfileBanner } from "../../../utils/styles/settings";
import { DivMouseEvent, InputChangeEvent } from "../../../utils/types";

type Props = {
  bannerSource: string;
  bannerSourceCopy: string;
  setBannerSourceCopy: Dispatch<SetStateAction<string>>;
  setBannerFile: Dispatch<SetStateAction<File | undefined>>;
};
const UserBanner = ({
  bannerSource,
  bannerSourceCopy,
  setBannerFile,
  setBannerSourceCopy,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();

  const handleFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setBannerSourceCopy(file ? URL.createObjectURL(file) : bannerSource);
    setBannerFile(file || undefined);
  };

  return (
    <>
      <SettingsProfileBanner
        backgroundUrl={bannerSourceCopy ?? bannerSource}
        ref={bannerRef}
        onClick={handleBannerClick}
      />
      <FileInput type="file" ref={fileInputRef} onChange={handleFileChange} />
    </>
  );
};

export default UserBanner;
