import React from 'react'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import Icon from '@/components/Icon'

const Services01 = ({ main = {}, services = [] }) => (
  <div className="mx-auto my-auto p-3 md:p-6 lg:p-12">
    <div className="flex flex-col items-center">
      <div className="grid gap-4 md:grid-cols-3 md:gap-12">
        <div className="col-span-1 row-span-2 mb-6 md:m-0">
          {/* Section labels are h2 for semantics, shown at their original small scale. */}
          <Reveal
            animation="fade-in slide-in-right"
            className="prose prose-invert [&_h2]:text-lg [&_h2]:font-bold md:[&_h2]:text-xl"
            delay={200}
          >
            <ContentRenderer source={main} />
          </Reveal>
        </div>
        {services?.map((item, i) => (
          <Reveal
            animation="fade-in zoom-in"
            className="prose bg-white"
            delay={(i % 2) * 100}
            key={i}
          >
            <div className="align-center flex flex-col bg-gradient-to-br from-alpha-100 via-alpha to-beta p-8">
              {item.icon && (
                <Icon {...item.icon} className="relative z-10 mb-6 h-12 w-12 fill-accent" />
              )}
              <h3 className="relative z-10 m-0 text-2xl font-bold md:text-3xl">{item.title}</h3>
            </div>
            <div className="p-8 pt-3">
              <ContentRenderer source={item} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
)

export default Services01
