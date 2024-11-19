import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function Footer1() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            {/* <Footer.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="BloodFlow"
            /> */}
          </div>
          <div style={{ textAlign: 'left', marginTop: '1rem', padding: '10px' }}>
            <Footer.Title title="About" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f5f5f5' }} />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Flowbite</Footer.Link>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Tailwind CSS</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div style={{ textAlign: 'left', marginTop: '1rem', padding: '10px' }}>
            <Footer.Title title="Follow us" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f5f5f5' }} />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Github</Footer.Link>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Discord</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div style={{ textAlign: 'left', marginTop: '1rem', padding: '10px' }}>
            <Footer.Title title="Legal" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f5f5f5' }} />
            <Footer.LinkGroup col>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Privacy Policy</Footer.Link>
              <Footer.Link href="#" style={{ color: '#f5f5f5', marginBottom: '0.5rem', display: 'block', fontSize: '1rem' }}>Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
