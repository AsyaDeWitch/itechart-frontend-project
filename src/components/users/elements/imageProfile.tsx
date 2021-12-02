import "./imageProfile.scss";

export default function ImageProfile(props: { image64: string }): JSX.Element {
  return (
    <div className="image-profile__container">
      <div className="image-profile">
        <img className="image-profile__image" src={props.image64} alt="Profile" />
      </div>
    </div>
  );
}
