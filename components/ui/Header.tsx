import Image from 'next/image';
import WkuLogo from '~/public/wku_w.png';
import WkuSquare from '~/public/wkucuptall_w.png'
import Hamburger from '~/components/ui/Hamburger'

export default function Header() {
    return (
        <header className="app-header">
          <Image 
            src={WkuSquare}
            alt="WKU Logo"
            className="app-header-logo"
          />
          <nav className="app-main-navigation">

          </nav>
          <Hamburger />
        </header>
    )
}