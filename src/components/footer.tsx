import "./footer.scss";
import imgBlizzard from "images/activision-blizzard.png";
import imgBandai from "images/bandai.png";
import imgEA from "images/electronics-arts.png";
import imgEG from "images/epic-games.png";
import imgMicrosoft from "images/microsoft.png";
import imgNintendo from "images/nintendo.png";
import imgRockstar from "images/rockstar.png";
import imgSega from "images/sega.png";
import imgSony from "images/sony.png";
import imgTencent from "images/tencent.png";

export default function Footer(): JSX.Element {
  return (
    <div>
      <footer className="footer">
        <hr />
        <p className="footer__slogan">Incredible convenient</p>
        <ul className="footer__menu">
          <li>
            <a className="footer__links" href="https://www.microsoft.com/en-us">
              <img src={imgMicrosoft} alt="Microsoft" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.activisionblizzard.com/">
              <img src={imgBlizzard} alt="Activision Blizzard" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://en.bandainamcoent.eu/">
              <img src={imgBandai} alt="Bandai" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.sony.com/en/">
              <img src={imgSony} alt="Sony" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.ea.com/">
              <img src={imgEA} alt="Electronics Arts" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.nintendo.com/">
              <img src={imgNintendo} alt="Nintendo" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.epicgames.com/store/en-US/">
              <img src={imgEG} alt="Epic Games" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.tencent.com/en-us">
              <img src={imgTencent} alt="Tencent" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.rockstargames.com/">
              <img src={imgRockstar} alt="Rockstar Games" className="footer__icons" />
            </a>
          </li>
          <li>
            <a className="footer__links" href="https://www.sega.com/">
              <img src={imgSega} alt="Sega" className="footer__icons" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
