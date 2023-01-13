import { Edit } from "akar-icons";
import { useContext, useState } from "react";
import { MoonLoader } from "react-spinners";
import UserAvatar from "../../components/settings/profile/UserAvatar";
import UserBanner from "../../components/settings/profile/UserBanner";
import { updateUserProfile } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import { getImageUrl } from "../../utils/helpers";
import { Page, StyledOverlay } from "../../utils/styles";
import { Button } from "../../utils/styles/button";
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileEditActionBar,
  ProfileSection,
  SettingsProfileUserDetails,
} from "../../utils/styles/settings";

const SettingsProfilePage = () => {
  const { user, updateAuthUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const about = user?.profile?.about ?? "";
  const [aboutCopy, setAboutCopy] = useState(about);
  const bannerSource = getImageUrl(user?.profile?.banner ?? "");
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [bannerFile, setBannerFile] = useState<File>();
  const avatarSource = getImageUrl(user?.profile?.avatar ?? "");
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(avatarSource);
  const [avatarFile, setAvatarFile] = useState<File>();

  const isChanged = () => aboutCopy !== about || bannerFile || avatarFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
    setIsEditing(false);
  };

  const save = async () => {
    const formData = new FormData();
    about !== aboutCopy && formData.append("about", aboutCopy);
    bannerFile && formData.append("banner", bannerFile);
    avatarFile && formData.append("avatar", avatarFile);

    console.log("hello world");

    try {
      setLoading(true);
      const { data: updatedUser } = await updateUserProfile(formData);
      updateAuthUser(updatedUser);
      setAboutCopy(updatedUser.profile?.about ?? about);
      setBannerSourceCopy(
        getImageUrl(updatedUser.profile?.banner ?? avatarSource)
      );
      setAvatarSourceCopy(
        getImageUrl(updatedUser.profile?.avatar ?? avatarSource)
      );
      URL.revokeObjectURL(bannerSourceCopy);
      URL.revokeObjectURL(avatarSourceCopy);
      setBannerFile(undefined);
      setAvatarFile(undefined);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <StyledOverlay>
          <MoonLoader size={40} color="#fff" />
        </StyledOverlay>
      )}
      <Page>
        <UserBanner
          bannerSource={bannerSource}
          bannerSourceCopy={bannerSourceCopy}
          setBannerSourceCopy={setBannerSourceCopy}
          setBannerFile={setBannerFile}
        />
        <ProfileSection>
          <SettingsProfileUserDetails>
            <UserAvatar
              avatarSource={avatarSource}
              avatarSourceCopy={avatarSourceCopy}
              setAvatarSourceCopy={setAvatarSourceCopy}
              setAvatarFile={setAvatarFile}
            />
            <span>@{user?.username ?? "username"}</span>
          </SettingsProfileUserDetails>
          <ProfileAboutSection>
            <ProfileAboutSectionHeader>
              <label htmlFor="about">About me</label>
              <Edit
                cursor="pointer"
                size={28}
                strokeWidth={2}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              />
            </ProfileAboutSectionHeader>
            <ProfileDescriptionField
              maxLength={200}
              disabled={isEditing}
              value={aboutCopy}
              onChange={(e) => setAboutCopy(e.target.value)}
            />
          </ProfileAboutSection>
          {isChanged() && (
            <ProfileEditActionBar>
              <div>
                <span>You have unsaved changes</span>
              </div>
              <div className="buttons">
                <Button size="md" variant="secondary" onClick={reset}>
                  Reset
                </Button>
                <Button size="md" onClick={save} disabled={loading}>
                  Save
                </Button>
              </div>
            </ProfileEditActionBar>
          )}
        </ProfileSection>
      </Page>
    </>
  );
};

export default SettingsProfilePage;
