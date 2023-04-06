import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8  bottom-0 w-full sticky z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2">
            <nav className="flex space-x-4">
              <Link href="/about">
                <p className="text-gray-300 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </p>
              </Link>
              <Link href="/contact">
                <p className="text-gray-300 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </p>
              </Link>
              <Link href="/privacy">
                <p className="text-gray-300 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Privacy
                </p>
              </Link>
            </nav>
          </div>
          <div className="mt-8 md:mt-0 md:order-1 left-0 flex justify-center md:justify-start">
            <p className="text-gray-300 text-sm">&copy; 2023 Knowly</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
