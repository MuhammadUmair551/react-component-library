import React, { useState } from 'react'
import { getColorFromName, SHAPES, SIZES, STATUS_COLORS, INITIAL_COLORS } from './Avatar.types';

function DefaultIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24"
            fill="currentColor" className="text-white opacity-80">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12
        2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2
        0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
    );
}

function Avatar(
    {
        src = 'https://www.clipartmax.com/png/middle/144-1442578_flat-person-icon-download-dummy-man.png',
        alt = 'aa',
        name = 'ADadasdg daskjd ',
        size = 'xl',
        shape = 'circle',
        status = 'online',
        className = '',
    }) {
    const [imgError, setImgError] = useState(false);

    const s = SIZES[size] ?? SIZES.md;
    const sh = SHAPES[shape] ?? SHAPES.circle;

    const showImage = src && !imgError
    const showInitials = !showImage && name;
    const showDefault = !showImage && !showInitial;

    const bgColor = showInitials ? getColorFromName(name) : 'bg-gray-500'

    return (
        <div className={`relative inline-flex flex-shrink-0 ${className}`}>

            <div
                className={`
          ${s.avatar} ${sh}
          flex items-center justify-center
          overflow-hidden select-none
          ${!showImage ? bgColor : 'bg-gray-200'}
        `}
            >
                {showImage && (
                    <img
                        src={src}
                        alt={alt || name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                    />
                )}

                {showInitials && (
                    <span className={`${s.text} font-semibold text-white leading-none`}>
                        {getInitials(name)}
                    </span>
                )}

                {showDefault && (
                    <DefaultIcon size={s.icon} />
                )}
            </div>

            {status && STATUS_COLORS[status] && (
                <span
                    className={`
            absolute bottom-0 right-0
            ${s.dot} rounded-full
            ${STATUS_COLORS[status]}
            ring-2 ring-white
          `}
                />
            )}
        </div>
    );
}

export default Avatar
