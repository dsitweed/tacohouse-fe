import { Layout } from "antd";
import Youtube_logo from "@/assets/images/YouTube_logo.svg";
import Facebook_logo from "@/assets/images/Facebook_logo.png";
import Github_logo from "@/assets/images/Github_logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Layout.Footer>
      <div className="flex justify-center gap-8 mb-4">
        <Link to={'/'}>Company</Link>
        <Link to={'/'}>About Us</Link>
        <Link to={'/'}>Teams</Link>
        <Link to={'/'}>Products</Link>
        <Link to={'/'}>Blogs</Link>
        <Link to={'/'}>Pricing</Link>
      </div>
      <div className="flex justify-center gap-10">
        <a href="#" target="_blank">
          <img src={Youtube_logo} alt="youtube logo" className="h-6 w-6" />
        </a>
        <a href="#" target="_blank">
          <img src={Facebook_logo} alt="facebook logo" className="h-6 w-6" />
        </a>
        <a href="#" target="_blank">
          <img src={Github_logo} alt="github logo" className="h-6 w-6" />
        </a>
      </div>
      <div>Copyright © {new Date().getFullYear()} Muse by Nguyen Van Ky</div>
    </Layout.Footer>
  );
}
