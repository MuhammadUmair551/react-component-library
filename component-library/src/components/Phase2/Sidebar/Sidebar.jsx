import React, { useState } from 'react'
import { DEFAULT_ITEMS, WIDTHS } from './Sidebar.types';
import { SidebarIcon } from './SidebarIcon';


function NavItem({ item, collapsed, active, onClick }) {
    const [hovered, setHovered] = useState(false);

    if (item.divider) {
        return (
            <div className="my-2 mx-3 border-t border-gray-700/60" />
        );
    }

    return (
        <div className="relative px-2">
            <button
                onClick={() => onClick(item.id)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`
          group w-full flex items-center gap-3
          rounded-lg transition-all duration-150
          ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}
          ${active
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
        `}
            >
                {/* Active indicator bar */}
                {active && (
                    <span className="
            absolute left-0 top-1/2 -translate-y-1/2
            w-0.5 h-5 bg-blue-400 rounded-r-full
          "/>
                )}

                {/* Icon */}
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5">
                    <SidebarIcon name={item.icon} size={18} />
                </span>

                {/* Label — collapse pe hide */}
                <span className={`
          flex-1 text-sm font-medium text-left truncate
          transition-all duration-200
          ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
        `}>
                    {item.label}
                </span>

                {/* Badge — collapse pe hide */}
                {item.badge && !collapsed && (
                    <span className="
            flex-shrink-0 min-w-[18px] h-[18px] px-1
            flex items-center justify-center
            text-[10px] font-semibold
            bg-blue-500 text-white rounded-full
          ">
                        {item.badge}
                    </span>
                )}
            </button>

            {/* Tooltip — sirf collapsed mode mein */}
            {collapsed && hovered && (
                <div className="
          absolute left-full top-1/2 -translate-y-1/2
          ml-2 px-2.5 py-1.5 z-50
          bg-gray-800 text-white text-xs font-medium
          rounded-lg shadow-lg whitespace-nowrap
          pointer-events-none
          border border-gray-700
        ">
                    {item.label}
                    {item.badge && (
                        <span className="ml-1.5 px-1 py-0.5 bg-blue-500 rounded text-[9px]">
                            {item.badge}
                        </span>
                    )}
                    {/* Arrow */}
                    <span className="
            absolute right-full top-1/2 -translate-y-1/2
            border-4 border-transparent border-r-gray-800
          "/>
                </div>
            )}
        </div>
    );
}

function Sidebar({
    items = DEFAULT_ITEMS,
    defaultItem = 'dashboard',
    logo = "MyApp",
    accentColor = '#3B82F6',
    user = { name: "Ahmed Raza", role: 'developer' },
    onNavigate,
}) {

    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState(defaultItem || items[0]?.id);

    function handleItemClick(id) {
        setActiveItem(id);
        onNavigate?.(id);
    }

    const mainItems = items.filter(i => !i.bottom);
    const bottomItems = items.filter(i => i.bottom);

    return (
        <aside
            className={`
        flex flex-col h-screen
        bg-gray-900 border-r border-gray-800
        transition-all duration-300 ease-in-out
        flex-shrink-0
        ${collapsed ? WIDTHS.collapsed : WIDTHS.expanded}
      `}
        >
            {/* ── Header ── */}
            <div className={`
        flex items-center h-16 px-3 flex-shrink-0
        border-b border-gray-800
        ${collapsed ? 'justify-center' : 'justify-between'}
      `}>
                {/* Logo */}
                <div className={`
          flex items-center gap-2.5 overflow-hidden
          transition-all duration-200
          ${collapsed ? 'w-0 opacity-0' : 'opacity-100'}
        `}>
                    <div
                        className="flex-shrink-0 w-7 h-7 rounded-lg
              flex items-center justify-center"
                        style={{ background: accentColor }}
                    >
                        <span className="text-white font-bold text-xs">
                            {logo[0]}
                        </span>
                    </div>
                    <span className="text-white font-semibold text-sm truncate">
                        {logo}
                    </span>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(p => !p)}
                    className="
            flex-shrink-0 w-7 h-7 rounded-md
            flex items-center justify-center
            text-gray-400 hover:text-white
            hover:bg-gray-800 transition-colors duration-150
            focus:outline-none
          "
                >
                    <span className={`
            transition-transform duration-300
            ${collapsed ? 'rotate-180' : ''}
          `}>
                        <SidebarIcon name="chevronLeft" size={16} />
                    </span>
                </button>
            </div>

            {/* ── Nav Items ── */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5">
                {mainItems.map((item, idx) => (
                    <NavItem
                        key={item.divider ? `div-${idx}` : item.id}
                        item={item}
                        collapsed={collapsed}
                        active={activeItem === item.id}
                        onClick={handleItemClick}
                    />
                ))}
            </nav>

            {/* ── Bottom Items (Settings etc.) ── */}
            {bottomItems.length > 0 && (
                <div className="py-2 border-t border-gray-800 space-y-0.5">
                    {bottomItems.map(item => (
                        <NavItem
                            key={item.id}
                            item={item}
                            collapsed={collapsed}
                            active={activeItem === item.id}
                            onClick={handleItemClick}
                        />
                    ))}
                </div>
            )}

            {/* ── Footer / User ── */}
            <div className={`
        flex items-center gap-3 p-3 flex-shrink-0
        border-t border-gray-800
        ${collapsed ? 'justify-center' : ''}
      `}>
                {/* Avatar */}
                <div
                    className="
            flex-shrink-0 w-8 h-8 rounded-full
            flex items-center justify-center
            text-white text-xs font-semibold
          "
                    style={{ background: accentColor }}
                >
                    {user.name?.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>

                {/* User info */}
                <div className={`
          flex-1 min-w-0 overflow-hidden
          transition-all duration-200
          ${collapsed ? 'w-0 opacity-0' : 'opacity-100'}
        `}>
                    <p className="text-sm font-medium text-white truncate">
                        {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                        {user.role}
                    </p>
                </div>

                {/* Logout */}
                {!collapsed && (
                    <button className="
            flex-shrink-0 p-1.5 rounded-md
            text-gray-400 hover:text-white
            hover:bg-gray-800 transition-colors
          ">
                        <SidebarIcon name="logout" size={15} />
                    </button>
                )}
            </div>
        </aside>
    );
}


export default Sidebar
