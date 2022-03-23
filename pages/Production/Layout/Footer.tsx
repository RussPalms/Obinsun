import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-6 z-50">
      <div className="py-6 border-t border-gray-800 dark:border-[#4C8EFF] text-center flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          Powered by
          <a
            href="http://palmaview.com"
            title="Learn more about how this site was made"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0.5"
          >
            {/* Obinsun Merch */}
            PalmaView
          </a>
          , Built by{' '}
          <a
            href="https://russellpalma.com"
            title="Follow the creator on Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0.5"
          >
            <b>Russell</b>
          </a>
        </p>
        <nav className="flex items-center justify-end space-x-3 md:space-x-6">
          <Link href="/faq" passHref>
            <a href="#faq">
              <p id="FAQs" className="p-1 transition text-sm">
                FAQS
              </p>
            </a>
          </Link>
          <Link href="/terms" passHref>
            <a href="#terms">
              <p id="terms" className="p-1 transition text-sm">
                Terms of Sale
              </p>
            </a>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
