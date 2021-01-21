import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="border-t bg-accent-1 border-accent-2">
      <Container>
        <div className="grid items-center content-center py-5 justify-items-center">
          <h3 className="text-xl font-bold leading-tight tracking-tighter text-center lg:text-5xl lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
            Copyright&copy; Slothcrew {year}
          </h3>
        </div>
      </Container>
    </footer>
  );
}
