import Image from "next/image";
import { ENTERPRISE_STRING } from "../constant/constant";
import enterprise from "../assets/Images/enterprise.jpg";
export default function page() {
  return (
    <div>
      <div className="w-full">
        <div>
          <Image
            src={enterprise}
            className="w-full"
            alt="Picture of the enterprise"
          />
        </div>

        <div className="flex w-full justify-between p-10 ">
          <div>logo</div>
          <div>
            <form>
              <div className="flex flex-col gap-6 ">
                <div>{ENTERPRISE_STRING.FOR_ENTERPRISE}</div>

                {ENTERPRISE_STRING.FORM_DATA.map((item, index) => (
                  <>
                    {index === 0 || index === 4 ? (
                      <div>
                        {index === 0 ? (
                          <select className="p-2 w-full border-b rounded border-r-2 border-gray-300">
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
                          <select className="p-2 w-full  border-b rounded border-r-2 border-gray-300">
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
                          className="w-full border-b rounded border-r-2 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit "
                        />
                        <label  htmlFor={item} className="absolute pl-2 left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700">
                          {item}
                        </label>
                      </div>
                    )}
                  </>
                ))}
                <div>
                    
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
