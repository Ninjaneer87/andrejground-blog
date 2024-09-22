import { Icon } from '@iconify-icon/react';
import { WORK_HISTORY } from 'src/constants';

function Timeline() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-thin mb-16 text-center">Work history</h2>
      <div className="relative border-l border-gray-200/30">
        {WORK_HISTORY.map(
          ({
            position,
            duration,
            company,
            description,
            isOngoing,
            href,
            companyLocation,
            technologies,
          }) => (
            <div key={company} className="mb-10 ml-12">
              {/* ACTIVE BUBBLE PING ANIMATION */}
              {isOngoing && (
                <span
                  style={{ animationDuration: '3s' }}
                  className="animate-ping flex absolute -left-3 justify-center items-center w-6 h-6 bg-accent rounded-full ring-8 ring-accent"
                ></span>
              )}
              {/* BUBBLE */}
              <span
                className={`flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full ring-8 ${isOngoing ? 'ring-secondary bg-accent' : 'ring-gray-700 bg-gray-400'}`}
              >
                <span
                  className={`w-1/2 h-1/2 rounded-full ${isOngoing ? 'bg-secondary' : 'bg-gray-700'}`}
                ></span>
              </span>

              <div className="flex gap-2 flex-wrap items-baseline sm:justify-between">
                <div>
                  {/* COMPANY */}
                  <h3
                    className={`items-center text-lg font-semibold min-w-52 flex gap-2 ${isOngoing ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                  >
                    {company}
                    <a
                      target="_blank"
                      href={href}
                      aria-label={`External link to ${company}`}
                      className="text-accent text-xl"
                    >
                      <Icon icon="mdi:arrow-top-right-thin" />
                    </a>

                    <span className="font-light text-sm">
                      ({companyLocation})
                    </span>
                  </h3>

                  {/* COMPANY DESCRIPTION */}
                  <p
                    className={`text-xs ${isOngoing ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                  >
                    {description}
                  </p>
                </div>

                {/* DURATION */}
                <span
                  className={`text-sm font-normal leading-none min-w-36 ${isOngoing ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                >
                  {duration}
                </span>
              </div>

              <hr className="opacity-20 my-4" />

              {/* POSITION */}
              <p
                className={`text-sm mb-4 ${isOngoing ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
              >
                {position}
              </p>

              {/* TECHNOLOGIES */}
              <ul>
                {technologies.map(technology => (
                  <li
                    key={technology}
                    className={`inline-block bg-gray-200/30 rounded-full px-2 py-1 text-xs font-light mr-2 mt-2 ${isOngoing ? '' : 'opacity-60'}`}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Timeline;
