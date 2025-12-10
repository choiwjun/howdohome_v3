import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  FolderOpen,
  Image,
  ListChecks,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Home,
} from 'lucide-react';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  children?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { name: '대시보드', path: '/admin', icon: LayoutDashboard },
  { name: '상담 신청', path: '/admin/consultations', icon: MessageSquare },
  { 
    name: '콘텐츠 관리', 
    path: '/admin/content',
    icon: FileText,
    children: [
      { name: '소식 관리', path: '/admin/news' },
      { name: '현장일지 관리', path: '/admin/journals' },
      { name: '갤러리 관리', path: '/admin/gallery' },
      { name: '지명원 관리', path: '/admin/portfolios' },
    ]
  },
  { name: '프로세스', path: '/admin/process', icon: ListChecks },
  { name: 'FAQ', path: '/admin/faqs', icon: HelpCircle },
  { name: '미디어', path: '/admin/media', icon: Image },
  { name: '사이트 설정', path: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['콘텐츠 관리']);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.name);
    const active = isActive(item.path);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </div>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {isExpanded && (
            <div className="ml-9 mt-1 space-y-1">
              {item.children!.map(child => (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === child.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          active ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <span className="font-bold text-gray-900">하우두홈 관리자</span>
        <div className="w-10" />
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link to="/admin" className="font-bold text-xl text-gray-900">
            하우두홈 관리자
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.email?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                target="_blank"
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                title="사이트 보기"
              >
                <Home size={18} />
              </Link>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                title="로그아웃"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
