import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileSubmenu = (itemName: string) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === itemName ? null : itemName);
  };

  const menuItems = [
    {
      name: '건축갤러리',
      path: '/gallery',
      submenu: [
        { name: '주택', path: '/gallery/house' },
        { name: '아파트 인테리어', path: '/gallery/apartment' }
      ]
    },
    {
      name: '프로세스',
      path: '/process'
    },
    {
      name: '지명원',
      path: '/portfolio'
    },
    {
      name: '커뮤니티',
      path: '/community',
      submenu: [
        { name: '하우두홈 소식', path: '/news' },
        { name: '현장일지', path: '/journal' }
      ]
    },
    {
      name: '고객지원',
      path: '/support',
      submenu: [
        { name: '상담', path: '/support/consultation' },
        { name: '찾아갑니다', path: '/support/visit' },
        { name: '오시는 길', path: '/support/location' }
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl tracking-tight text-gray-900 font-black">하우두홈</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 transition-colors ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown size={16} />}
                </Link>
                
                {item.submenu && activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 pt-2"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[180px]">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="flex items-center justify-between w-full text-left py-2 text-gray-900"
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${
                          mobileActiveSubmenu === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileActiveSubmenu === item.name && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block py-2 text-gray-600"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setMobileActiveSubmenu(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block py-2 text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}