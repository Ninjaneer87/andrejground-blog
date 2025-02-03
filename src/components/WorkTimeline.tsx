import { Icon } from '@iconify-icon/react';
import { JOBS_LIST } from 'src/constants';

function Timeline() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-thin mb-16 text-center">Career path</h2>
      <div className="relative border-l border-gray-200/30">
        {JOBS_LIST.map(
          ({
            positions,
            company,
            description,
            href,
            companyLocation,
            technologies,
          }, jobIndex) => {
            const isOngoingJob = jobIndex === 0;

            return (
              <div key={company} className="mb-10 ml-12">
                {/* ACTIVE BUBBLE PING ANIMATION */}
                {isOngoingJob && (
                  <span
                    style={{ animationDuration: '3s' }}
                    className="animate-ping flex absolute -left-3 justify-center items-center w-6 h-6 bg-accent rounded-full ring-8 ring-accent"
                  ></span>
                )}
                {/* BUBBLE */}
                <span
                  className={`flex shadow-3d absolute -left-3 justify-center items-center w-6 h-6 rounded-full ring-8 ${isOngoingJob ? 'ring-background bg-accent' : 'ring-gray-700 bg-gray-400'}`}
                >
                  <span
                    className={`w-1/2 h-1/2 rounded-full ${isOngoingJob ? 'bg-background' : 'bg-gray-700'}`}
                  ></span>
                </span>

                <div>
                  {/* COMPANY */}
                  <h3
                    className={`items-center text-lg font-semibold min-w-52 flex gap-2 ${isOngoingJob ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                  >
                    {company}
                    <a
                      target="_blank"
                      href={href}
                      aria-label={`See ${company} website`}
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
                    className={`text-xs ${isOngoingJob ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                  >
                    {description}
                  </p>
                </div>

                <hr className="opacity-20 my-4" />

                <ul className="flex flex-col pl-[0.75rem] border-gray-200/30 gap-4 mb-4">
                  {/* POSITIONS */}
                  {positions.map(({ title, period }, positionIndex) => {
                    const isOngoingPosition = positionIndex === 0 && isOngoingJob;
                    const isLastPosition = positionIndex === positions.length - 1;
                    return (
                      <li
                        key={title}
                        className={`relative after:content-[""] 
                        ${
                          !isLastPosition
                            ? 'after:absolute after:-left-3 after:w-[1px] after:h-full after:bg-gray-200/30 after:top-[1.1rem] after:-translate-x-[1px]'
                            : ''
                        }
                        before:rounded-full before:absolute before:content-[""] before:-left-3 before:w-[7px] before:h-[7px] 
                        ${isOngoingPosition ? 'before:bg-foreground' : 'before:bg-gray-200/30'} 
                        before:top-[0.38rem] before:-translate-x-1/2
                        `}
                      >
                        <div className="flex gap-2 flex-wrap items-baseline sm:justify-between">
                          {/* POSITION TITLE */}
                          <div
                            className={`text-sm ${isOngoingPosition ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                          >
                            {title}
                          </div>

                          {/* POSITION PERIOD */}
                          <span
                            className={`text-sm font-normal leading-none min-w-36 ${isOngoingPosition ? 'text-foreground' : 'text-foreground/60 font-extralight'}`}
                          >
                            {period}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* TECHNOLOGIES */}
                <ul>
                  {technologies.map(technology => (
                    <li
                      key={technology}
                      className={`inline-block bg-gray-200/30 rounded-full px-2 py-1 text-xs font-light mr-2 mt-2 ${isOngoingJob ? '' : 'opacity-60'}`}
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export default Timeline;
