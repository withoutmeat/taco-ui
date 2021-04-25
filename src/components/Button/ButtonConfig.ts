// todo: 借助于prepack做到 bg-${ButtonColor} -> bg-primary

export const containedVariantClasses = ['border shadow-sm']
export const outlinedVariantClasses = ['border shadow-sm']
export const textVariantClasses = []

// size
export const largeSizeClasses = ['px-4 py-[6px] rounded-sm']
export const mediumSizeClasses = ['px-4 py-1 rounded-sm']
export const smallSizeClasses = ['px-2 rounded-sm']

export const defaultColorClasses = {
  contained: [
    'bg-white border-gray-300',
    'hover:border-primary hover:text-primary',
    'focus:border-primary focus:text-primary',
  ],
  outlined: [
    'border-gray-300',
    'hover:border-primary hover:text-primary',
    'focus:border-primary focus:text-primary',
  ],
  text: [],
}

export const primaryColorClasses = {
  contained: [
    'bg-primary border-primary text-white',
    'hover:bg-blue-500 hover:border-blue-500',
    'focus:bg-blue-500 focus:border-blue-500',
  ],
  outlined: [
    'border-primary text-primary',
    'hover:border-blue-500 hover:text-blue-500 ',
    'focus:border-blue-500 focus:text-blue-500 ',
  ],
  text: ['text-primary'],
}

export const secondaryColorClasses = defaultColorClasses

export const warningColorClasses = {
  contained: [
    'bg-warning border-warning text-white',
    'hover:bg-yellow-500 hover:border-yellow-500',
    'focus:bg-yellow-500 focus:border-yellow-500',
  ],
  outlined: [
    'border-warning text-warning',
    'hover:border-yellow-500 hover:text-yellow-500 ',
    'focus:border-yellow-500 focus:text-yellow-500 ',
  ],
  text: ['text-warning'],
}

export const dangerColorClasses = {
  contained: [
    'bg-danger border-danger text-white',
    'hover:bg-red-500 hover:border-red-500',
    'focus:bg-red-500 focus:border-red-500',
  ],
  outlined: [
    'border-danger text-danger',
    'hover:border-red-500 hover:text-red-500 ',
    'focus:border-red-500 focus:text-red-500 ',
  ],
  text: ['text-danger'],
}
