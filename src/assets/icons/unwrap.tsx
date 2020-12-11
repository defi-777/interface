import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Unwrap = forwardRef<SVGElement, any>(({ color = 'currentColor', size = 24, ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-187 189 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M-172.2,190" />
      <path d="M-164.3,194.6" />
      <path d="M-166.9,205.7v-7c0-0.6-0.3-1.2-0.9-1.5l-6.1-3.5c-0.5-0.3-1.2-0.3-1.8,0l-6.1,3.5c-0.5,0.3-0.9,0.9-0.9,1.5v7
        c0,0.6,0.3,1.2,0.9,1.5l6.1,3.5c0.5,0.3,1.2,0.3,1.8,0l6.1-3.5C-167.2,206.9-166.9,206.3-166.9,205.7z"/>
      <polyline points="-182.4,197.8 -174.8,202.2 -167.1,197.8 " />
      <line x1="-174.8" y1="211.1" x2="-174.8" y2="202.2" />
      <polyline points="-175.1,193.2 -177.5,190.1 -184.4,194.4 -182.2,197.6 " />
      <polyline points="-174.8,193.3 -171.9,190.2 -164.9,194.4 -167.3,197.6 " />
    </svg>
  )
})

Unwrap.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Unwrap.displayName = 'Unwrap'

export default Unwrap
