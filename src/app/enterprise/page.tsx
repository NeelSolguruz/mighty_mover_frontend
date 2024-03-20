import Image from "next/image";
import { ENTERPRISE_STRING } from "../constant/constant";
import enterprise from "../assets/Images/enterprise.jpg";
import Logo from "../assets/Images/Enterprise_logo_1.jpg";

export default function page() {
  return (
    <div>
      <div className="w-full flex flex-col gap-10">
        <div>
          <Image
            src={enterprise}
            className="w-full"
            alt="Picture of the enterprise"
          />
        </div>

        <div className="flex w-full justify-center p-10 flex-wrap gap-10">
          <div className="text-4xl font-semibold">
            {ENTERPRISE_STRING.WHY_USE_PORTER}
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="w-1/2 flex gap-10 ml-24">
            {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO.map((item, index) => (
              <>
                <div className="flex flex-col justify-center gap-8 items-center p-2 w-2/5 ">
                  <div>
                    <Image
                      src={Logo}
                      alt="Logo"
                      className="w-42 h-42 rounded-full shadow-gray-400 shadow-md transition-all hover:scale-105"
                    ></Image>
                  </div>
                  <div className="text-xl font-semibold w-auto">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DATA}
                  </div>
                  <div className="flex text-sm font-light text-center">
                    {ENTERPRISE_STRING.WHY_USE_PORTER_LOGO[index].DESC}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="mr-14 w-4/12 p-10 rounded-3xl shadow-gray-400 shadow-md">
            <form>
              <div className="flex flex-col gap-6">
                <div className="flex justify-center text-4xl font-semibold text-blue-950">
                  {ENTERPRISE_STRING.FOR_ENTERPRISE}
                </div>

                {ENTERPRISE_STRING.FORM_DATA.map((item, index) => (
                  <>
                    {index === 0 || index === 4 ? (
                      <div>
                        {index === 0 ? (
                          <select className="p-2 w-full border-b rounded border-r-2 border-gray-300 font-semibold">
                            {ENTERPRISE_STRING.FORM_CITIES.map(
                              (item, index) => (
                                <>
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                </>
                              )
                            )}
                          </select>
                        ) : (
                          <select className="p-2 w-full  border-b rounded border-r-2 border-gray-300 font-semibold">
                            {ENTERPRISE_STRING.FORM_MONTHLY_TRIPS.map(
                              (item, index) => (
                                <>
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                </>
                              )
                            )}
                          </select>
                        )}
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          id={item}
                          name={item}
                          type="text"
                          className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-amber-800 transition-colors focus:outline-none peer "
                        />
                        <label
                          htmlFor={item}
                          className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all font-semibold"
                        >
                          {item}
                        </label>
                      </div>
                    )}
                  </>
                ))}
                <div>
                  <button className="w-full bg-amber-500 p-2 rounded text-blue-950 text-lg font-semibold hover:scale-105 transition-all transition-300">
                    {ENTERPRISE_STRING.REQUEST_CALLBACK}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className=" flex flex-col bg-black text-white justify-center items-center">
          <div classname="">Heading</div>
          <div>Data</div>
        </div>
      </div>
    </div>
  );
}
