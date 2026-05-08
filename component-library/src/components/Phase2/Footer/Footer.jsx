import React, { useState } from 'react';
import { SocialIcon } from './FooterIcons';
import {
    DEFAULT_COLUMNS,
    DEFAULT_SOCIALS,
    DEFAULT_BOTTOM_LINKS,
} from './Footer.types';

export function Footer({
    logo = 'MyBrand',
    description = 'Building products that make a difference.',
    columns = DEFAULT_COLUMNS,
    socials = DEFAULT_SOCIALS,
    bottomLinks = DEFAULT_BOTTOM_LINKS,
    showNewsletter = true,
    variant = 'dark',
    copyrightName = 'MyBrand',
}) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isDark = variant === 'dark';

    // Theme tokens
    const theme = {
        wrapper: isDark ? 'bg-gray-900' : 'bg-gray-50 border-t border-gray-200',
        text: isDark ? 'text-gray-300' : 'text-gray-600',
        textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
        textStrong: isDark ? 'text-white' : 'text-gray-900',
        colTitle: isDark ? 'text-gray-200' : 'text-gray-800',
        link: isDark ? 'text-gray-400 hover:text-white'
            : 'text-gray-500 hover:text-gray-900',
        divider: isDark ? 'border-gray-800' : 'border-gray-200',
        input: isDark
            ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500',
        socialBtn: isDark
            ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-900',
    };

    function handleSubscribe(e) {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setEmail('');
    }

    const year = new Date().getFullYear();

    return (
        <footer className={`${theme.wrapper} ${theme.text}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16
          py-12 lg:py-16
          ${showNewsletter ? `border-b ${theme.divider}` : ''}
        `}>
                    <div className="max-w-sm">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-600
                flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">{logo[0]}</span>
                            </div>
                            <span className={`font-semibold text-lg ${theme.textStrong}`}>
                                {logo}
                            </span>
                        </div>
                        <p className={`text-sm leading-relaxed ${theme.textMuted}`}>{description}</p>
                        <div className="flex items-center gap-2.5 mt-6">
                            {
                                socials.map(s => (
                                    <a href={s.href}
                                        key={s.platform}
                                        aria-label={s.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                    w-9 h-9 rounded-lg flex items-center justify-center
                    transition-colors duration-150
                    ${theme.socialBtn}
                  `}
                                    >
                                        <SocialIcon platform={s.platform} />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    {
                        showNewsletter && (
                            <div>
                                <h3 className={`font-semibold text-base mb-1 ${theme.textStrong}`}>
                                    Stay in the loop
                                </h3>
                                <p className={`text-sm mb-4 ${theme.textMuted}`}>
                                    Get the latest updates, articles, and resources
                                    delivered to your inbox.
                                </p>

                                {
                                    submitted ? (
                                        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                            <svg width="16" height="16" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor"
                                                strokeWidth="2.5" strokeLinecap="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            You're subscribed! Thanks.
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={handleSubscribe}
                                            className="flex gap-2"
                                        >
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className={`
                      flex-1 px-4 py-2.5 text-sm rounded-lg
                      border outline-none
                      transition-colors duration-150
                      ${theme.input}
                    `}
                                            />
                                            <button
                                                type="submit"
                                                className="
                      px-4 py-2.5 text-sm font-medium text-white
                      bg-blue-600 hover:bg-blue-700 rounded-lg
                      transition-colors duration-150
                      flex-shrink-0
                    "
                                            >
                                                Subscribe
                                            </button>
                                        </form>
                                    )}
                                <p className={`text-xs mt-2.5 ${theme.textMuted}`}>
                                    No spam, unsubscribe at any time.
                                </p>
                            </div>
                        )
                    }
                </div>

                <div className={`
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8
          py-12
          border-b ${theme.divider}
        `}>
                    {columns.map(col => (
                        <div key={col.title}>
                            <h4 className={`
                text-xs font-semibold uppercase
                tracking-wider mb-4 ${theme.colTitle}
              `}>
                                {col.title}
                            </h4>
                            <ul className="space-y-2.5">
                                {col.links.map(link => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className={`
                        text-sm transition-colors duration-150
                        ${theme.link}
                      `}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="py-6 flex flex-col sm:flex-row
          items-center justify-between gap-4">

                    {/* Copyright */}
                    <p className={`text-xs ${theme.textMuted}`}>
                        © {year} {copyrightName}. All rights reserved.
                    </p>

                    {/* Bottom Links */}
                    <div className="flex items-center gap-1">
                        {bottomLinks.map((link, idx) => (
                            <React.Fragment key={link.label}>
                                {idx > 0 && (
                                    <span className={`text-xs ${theme.textMuted} opacity-40`}>
                                        ·
                                    </span>
                                )}
                                <a
                                    href={link.href}
                                    className={`
                    text-xs px-2 py-1 rounded
                    transition-colors duration-150
                    ${theme.link}
                  `}
                                >
                                    {link.label}
                                </a>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
