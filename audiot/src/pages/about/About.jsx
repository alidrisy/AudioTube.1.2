/* eslint-disable react/prop-types */
const person = {
  name: "Abdulrahman Alidrisy",
  role: "Full Stack Software Engineer",
  imageUrl: "https://avatars.githubusercontent.com/u/125469989?v=4",
  github: "https://github.com/alidrisy",
}

const About = ({ onClick }) => {
  return (
    <div className="bg-white py-24 sm:py-32" onClick={onClick}>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a team of passionate developers working on our Car Rental
            application, bringing innovation and excellence to every line of
            code.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt={person.name}
                  />
                </a>
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    <a
                      href={person.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {person.name}
                    </a>
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-gray-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
