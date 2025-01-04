import Logo from "/src/assets/logo1.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer max-w-screen-xl bg-[#002a3f] m-auto text-neutral-content justify-center items-center p-4">
        <div className="grid-flow-col items-center">
          <img className="max-w-16" src={Logo} alt="Computer Club KYAU" />
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved and
            Developed By{" "}
            <a
              className="text-[#2ec4b6]"
              target="_blank"
              href="https://asif-talukder.vercel.app/"
            >
              Asif Talukder
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
