import { memo } from "react";
import "./imageProfile.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedImageProfile = memo(function ImageProfile(props: { image64: string }): JSX.Element {
  return (
    <div className="image-profile__container">
      <div className="image-profile">
        <img className="image-profile__image" src={props.image64} alt="Profile" />
      </div>
    </div>
  );
});

export default MemoizedImageProfile;
