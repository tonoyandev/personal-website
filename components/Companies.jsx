import React from 'react'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'

const Companies = ({ title, list }) => (
  <div className="prose prose-invert grid grid-cols-2 items-center gap-6 lg:grid-cols-4">
    {title && (
      <h2 className="mb-4 w-full text-2xl font-bold md:text-3xl lg:mb-0 lg:w-auto">{title}</h2>
    )}
    {list &&
      list.map(({ name, icon }, i) => (
        <Reveal key={name} animation="fade-in zoom-in" delay={i * 250}>
          {icon && (
            <Icon
              {...icon}
              title={name}
              className="h-12 w-36 fill-current text-omega-500 opacity-50"
            />
          )}
        </Reveal>
      ))}
  </div>
)

export default Companies
