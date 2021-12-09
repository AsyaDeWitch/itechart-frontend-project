import { memo } from "react";
import "./imageProfile.scss";

const MemoizedImageProfile = memo(
  (props: { image64: string }): JSX.Element => (
    <div className="image-profile__container">
      <div className="image-profile">
        <img className="image-profile__image" src={props.image64} alt="Profile" />
      </div>
    </div>
  )
);

MemoizedImageProfile.displayName = "ImageProfile";

export default MemoizedImageProfile;
