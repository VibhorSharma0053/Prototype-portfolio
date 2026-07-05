import { forwardRef, useCallback, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { HiOutlineArrowPath } from 'react-icons/hi2';

const sizeClasses = {
  sm: 'px-6 py-2.5 text-sm rounded-xl gap-1.5',
  md: 'px-8 py-3.5 text-base rounded-xl gap-2',
  lg: 'px-10 py-4 text-lg rounded-xl gap-2.5',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'gradient',
      size = 'md',
      loading = false,
      disabled = false,
      onClick,
      className = '',
      href,
      type = 'button',
      icon,
      ...props
    },
    ref
  ) => {
    const rippleRef = useRef(null);

    const handleRipple = useCallback(
      (e) => {
        if (disabled || loading) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          width: 20px;
          height: 20px;
          left: ${x - 10}px;
          top: ${y - 10}px;
          animation: ripple 0.6s ease-out forwards;
          pointer-events: none;
        `;

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      },
      [disabled, loading]
    );

    const handleClick = useCallback(
      (e) => {
        handleRipple(e);
        if (onClick && !disabled && !loading) {
          onClick(e);
        }
      },
      [handleRipple, onClick, disabled, loading]
    );

    const variantClasses = {
      gradient: 'btn-gradient',
      outline: 'btn-outline',
      ghost: 'text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300',
    };

    const baseClasses = `
      relative inline-flex items-center justify-center font-semibold
      transition-all duration-300 cursor-pointer select-none
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${className}
    `.trim();

    const content = (
      <>
        {loading && (
          <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
        )}
        {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      </>
    );

    if (href) {
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            onClick={handleRipple}
            whileTap={{ scale: 0.97 }}
            {...props}
          >
            {content}
          </motion.a>
        );
      }

      return (
        <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
          <Link ref={ref} to={href} className={baseClasses} onClick={handleRipple} {...props}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={baseClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
