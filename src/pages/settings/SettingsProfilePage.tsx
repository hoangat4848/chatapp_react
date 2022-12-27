import { Edit } from "akar-icons";
import { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import UserBanner from "../../components/settings/profile/UserBanner";
import { updateUserProfile } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
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
  const [about, setAbout] = useState(user?.profile?.about || "");
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Updating about");
    setAbout(user?.profile?.about || "");
  }, [user?.profile?.about]);

  const reset = () => {
    setAboutCopy(about);
    setIsEditing(false);
  };

  const save = async () => {
    const formData = new FormData();
    about !== aboutCopy && formData.append("about", aboutCopy);

    console.log("hello world");

    try {
      setLoading(true);
      const { data: updatedUser } = await updateUserProfile(formData);
      updateAuthUser(updatedUser);
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
        <UserBanner />
        <ProfileSection>
          <SettingsProfileUserDetails>
            <div className="avatar"></div>
            <span>@username</span>
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
          {aboutCopy !== about && (
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
