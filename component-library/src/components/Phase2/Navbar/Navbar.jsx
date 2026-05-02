import React, { useEffect, useState } from 'react'
import { NAV_LINKS } from './Navbar.types';

function Navbar({
    logo = "Brand",
    links = NAV_LINKS,
    sticky = true,
    showActions = true,
    onLogin,
    onSignup
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(true);
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        if (!sticky) return;

        function handleScroll() {
            setIsScrolled(window.scrollY > 10);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    function handleLinkClick(href) {
        setActiveLink(href);
        setIsOpen(false);
    };


    return (
        <nav className={`${sticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}bg-white border-b border-gray-100 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='h-16 flex justify-between items-center gap-8'>
                    <a href="/" className='flex items-center gap-2 flex-shrink-0' onClick={() => handleLinkClick('/')}>
                        <div className='w-8 h-8 rounded-lg bg-green-600 flex justify-center items-center'>
                            <span className='text-white font-bold text-sm'>
                                {logo[0]}
                            </span>
                        </div>
                        <span className='font-semibold text-gray-900 text-sm'>
                            {logo}
                        </span>
                    </a>

                    <ul className='hidden lg:flex gap-1 flex-1 items-center'>
                        {
                            links.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} onClick={() => handleLinkClick(link.href)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeLink === link.href ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                                        {link.label}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>

                    {
                        showActions && (
                            <div className='hidden lg:flex items-center gap-2 flex-shrink-0'>
                                <button className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-150' onClick={onLogin}>Login</button>
                                <button className='px-4 py-2 text-sm font-medium bg-blue-600 text-gray-100 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-150' onClick={onSignup}>Get Started</button>
                            </div>
                        )
                    }

                    <button className='lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50
              transition-colors duration-150
              focus:outline-none' onClick={() => setIsOpen(prev => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}>
                        <div className='w-5 h-4 flex flex-col justify-between'>
                            <span className={`
                block h-0.5 bg-current rounded-full
                transition-all duration-300 origin-center
                ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}
              `} />
                            <span className={`
                block h-0.5 bg-current rounded-full
                transition-all duration-300
                ${isOpen ? 'opacity-0 scale-x-0' : ''}
              `} />
                            <span className={`
                block h-0.5 bg-current rounded-full
                transition-all duration-300 origin-center
                ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}
              `} />
                        </div>
                    </button>
                </div>
            </div>
            <div className={`
          lg:hidden border-t border-gray-100
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
        `}>
                <div className="px-4 py-3 space-y-1 bg-white">
                    {
                        links.map(link => (
                            <a key={link.href}
                                href={link.href}
                                onClick={() => handleLinkClick(link.href)}
                                className={`
                flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${activeLink === link.href
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }
              `}>
                                {link.label}
                            </a>
                        ))
                    }
                    {
                        showActions && (
                            <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => { onLogin?.(); setIsOpen(false); }}
                className="w-full px-4 py-2.5 text-sm font-medium
                  text-gray-700 bg-gray-50 hover:bg-gray-100
                  rounded-lg transition-colors duration-150"
              >
                Login
              </button>
              <button
                onClick={() => { onSignup?.(); setIsOpen(false); }}
                className="w-full px-4 py-2.5 text-sm font-medium
                  text-white bg-blue-600 hover:bg-blue-700
                  rounded-lg transition-colors duration-150"
              >
                Get Started
              </button>
            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
