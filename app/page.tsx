import { Carousel } from "./components/Carousel";
import { slides } from "@/mocks/slides";

export default function Home() {
  return (
    <div className="bg-black">
      <Carousel slides={slides} />
    </div>
  );
}
