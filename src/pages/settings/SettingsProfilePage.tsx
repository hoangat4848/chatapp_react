import { Edit } from "akar-icons";
import { useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import UserBanner from "../../components/settings/profile/UserBanner";
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
  const [about, setAbout] = useState("hello world");
  const [editedAbout, setEditedAbout] = useState(about);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEditedAbout(about);
    setIsEditing(false);
  };

  const save = () => {
    setLoading(true);
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
              value={editedAbout}
              onChange={(e) => setEditedAbout(e.target.value)}
            />
          </ProfileAboutSection>
          {editedAbout !== about && (
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
