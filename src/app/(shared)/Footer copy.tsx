import tw from "tailwind-styled-components";

interface Footer {
  content: {
    text: {
      title?: string;
      subtitle?: string;
      description?: string;
      trademark?: string;
    };
    links: {
      text: string;
      url?: string;
    }[];
  };
}

type Props = {
  content: {
    text?: string;
    links?: {
      label?: string;
      href?: string;
    }[];
    copyright?: string;
    vat?: string;
  };
};

export function Footer2({ content }: Footer) {
  const Wrapper = tw.footer`mx-auto w-full py-4 px-10 border-t border-gray-200 font-body`;
  const Description = tw.span`block text-xs text-gray-500 dark:text-gray-500 sm:text-center mr-2`;

  return (
    <Wrapper className="p-0 px-4 py-3 border border-t-2 border-slate-100">
      <div className="grid w-full grid-cols-1 text-xs text-gray-500 md:grid-cols-3">
        <div className="flex flex-row items-center justify-start group ">
          {/* <Image
              src="/img/logo_drifter_icon.svg"
              alt=""
              className="mb-2 img-responsive h-9 w-9"
              width={20}
              height={20}
            /> */}
          <Description>
            {content.text.title}&copy;{new Date().getFullYear()}.
          </Description>
          <p>{content.text.trademark}</p>
        </div>
        <div>
          <ul className="flex-row items-center justify-center hidden gap-1 md:flex">
            {content.links?.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  className="p-1 transition duration-100 ease-in-out hover:text-gray-900"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end">
          <p>
            Built by{" "}
            <a
              href="http://www.drifter.agency"
              className="font-semibold text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Drifter
            </a>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export function FooterMain() {
  const Wrapper = tw.footer`mx-auto w-full py-4 px-10 border-t border-gray-200 font-body`;
  const InnerWrap = tw.div`mx-auto max-w-5xl w-full flex flex-col items-start justify-start sm:justify-between`;
  const Description = tw.span`block text-xs text-gray-500 dark:text-gray-500 sm:text-center mr-2`;

  return (
    <Wrapper>
      <InnerWrap>
        <footer className="flex justify-between p-10 footer bg-base-200 text-base-content">
          <aside>
            <p>
              startupmike.
              <br />
              Building tech since 1995
            </p>
          </aside>
          <div className="flex gap-6">
            <nav>
              <header className="footer-title">Services</header>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <header className="footer-title">Company</header>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <header className="footer-title">Legal</header>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </div>
        </footer>
      </InnerWrap>
    </Wrapper>
  );
}
