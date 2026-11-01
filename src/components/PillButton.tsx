import React from 'react';
import { Link } from 'react-router-dom';
import './PillButton.css';

export interface PillButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  to?: string;
  href?: string;
  variant?: 'primary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  onClick,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  style,
  type = 'button',
  target,
  rel,
  disabled = false
}) => {
  const rootClass = [
    'pill-btn',
    `pill-btn--${variant}`,
    `pill-btn--${size}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </>
  );

  const inner = (
    <>
      <span className="pill-btn__fill" aria-hidden="true" />
      <span className="pill-btn__face">{content}</span>
      <span className="pill-btn__face-alt" aria-hidden="true">
        {content}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={rootClass} style={style} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={rootClass} style={style} onClick={onClick} target={target} rel={rel}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={rootClass}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </button>
  );
};

export default PillButton;

