import React from 'react';
import { VARIANTS, PADDINGS } from './Card.types';

  function CardImage({
    src,
    alt,
    aspect,   
    zoom      = true,
    className = '',
  }) {
    const aspectClass = {
      video:  'aspect-video',
      square: 'aspect-square',
      auto:   '',
    }[aspect] ?? 'aspect-video';

    return (
      <div className={`w-full overflow-hidden ${aspectClass} ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`
            w-full h-full object-cover
            transition-transform duration-500
            ${zoom ? 'group-hover:scale-105' : ''}
          `}
        />
      </div>
    );
  }

function CardBadge({ children, color = 'blue' }) {
  const colors = {
    blue:   'bg-blue-600 text-white',
    green:  'bg-green-600 text-white',
    red:    'bg-red-600 text-white',
    amber:  'bg-amber-500 text-white',
    gray:   'bg-gray-800 text-white',
  };
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5
      text-xs font-semibold rounded-md
      ${colors[color] ?? colors.blue}
    `}>
      {children}
    </span>
  );
}

function CardBody({ children, padding = 'md', className = '' }) {
  return (
    <div className={`${PADDINGS[padding]} ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-sm  font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg  font-bold',
  };
  return (
    <h3 className={`
      text-gray-900 leading-snug
      ${sizes[size] ?? sizes.md} ${className}
    `}>
      {children}
    </h3>
  );
}

function CardText({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-500 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function CardFooter({ children, className = '' }) {
  return (
    <div className={`
      border-t border-gray-100 px-5 py-3
      flex items-center justify-between gap-3
      ${className}
    `}>
      {children}
    </div>
  );
}

export function Card({
  variant   = 'default',
  clickable = false,
  horizontal= false,
  className = '',
  onClick,
  children,
}) {
  const base = `
    group rounded-xl overflow-hidden
    transition-all duration-200
  `;

  const variantClass = VARIANTS[variant] ?? VARIANTS.default;

  const clickableClass = clickable ? `
    cursor-pointer
    hover:-translate-y-0.5
    active:scale-[0.99]
  ` : '';

  const layoutClass = horizontal
    ? 'flex flex-row'
    : 'flex flex-col';

  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`
        ${base} ${variantClass}
        ${clickableClass} ${layoutClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

Card.Image  = CardImage;
Card.Badge  = CardBadge;
Card.Body   = CardBody;
Card.Title  = CardTitle;
Card.Text   = CardText;
Card.Footer = CardFooter;