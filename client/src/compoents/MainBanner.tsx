import Carousel from "react-bootstrap/Carousel";
import "./MainBanner.css";
import BannerImg1 from "../assets/hr-connect-banner-1.jpg";
import BannerImg2 from "../assets/hr-connect-banner-2.jpg";
import BannerImg3 from "../assets/hr-connect-banner-3.jpg";
import Cardsection from "./Cardsection";
import MainNavbar from "./MainNavbar";

export interface IMainBannerProps {}

export default function MainBanner(props: IMainBannerProps) {
  return (
    <div>
      <MainNavbar />
      <div className="main-carousal">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 banner-image"
              src={BannerImg1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 banner-image"
              src={BannerImg2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 banner-image"
              src={BannerImg3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Cardsection />
    </div>
  );
}
