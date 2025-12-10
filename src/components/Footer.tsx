export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl">주식회사 하우두홈</h3>
          </div>
          <div className="text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <p>경기도 고양시 일산동구 중산로 156번길 62-4, 201호</p>
            <div className="flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-1">
              <span>T 031.975.9372</span>
              <span>F 031.975.4461</span>
              <span>E ppappy1118@naver.com</span>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">© 2024 하우두홈. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}