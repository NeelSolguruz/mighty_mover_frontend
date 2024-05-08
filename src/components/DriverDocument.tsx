import React, { ChangeEvent, useEffect, useState } from "react";
import http from "@/http/http";
import Image from "next/image";
// import InfoSvg from "@/assets/Images/icons/infoSvg";
import { documentData } from "@/constant/type/data.type";
import form_http from "@/http/formHttp";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface Document {
  id: string;
  internal_path: string;
  document: string;
}

function DriverDocument() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isModelopen, setModelOpen] = useState(false);
  const [selectedDocumentPreview, setSelectedDocumentPreview] = useState<
    string | null
  >(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [updateId, setUpdateId] = useState("");
  // const [selectOptions, setSelectOptions] = useState("");
  const [selectOptions, setSelectOptions] = useState<Set<string>>(new Set());
  // const [updatePrivewUrl, setUpdatePrivewUrl] = useState<string | undefined>(undefined);
  const [uploadButtonLoading, setUploadButtonLoading] = useState(false);
  const [noTableData, setNoTableData] = useState(true);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<keyof documentData>("aadhar");

  const [documentFormData, setDocumentFormData] = useState<documentData>({
    aadhar: null,
    licence: null,
    pancard: null,
    vehicle: null,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setNoTableData(true);
    try {
      const response = await http.get("api/v1/document");
      console.log(response);
      setDocuments(response.data.data);
      setNoTableData(false);

      // setSelectOptions(response.data.data.internal_path.split("/")[0]);
      if (response.data.message === 200) {
        const documentTypes: Set<string> = new Set(
          response.data.data.map(
            (doc: Document) => doc.internal_path.split("/")[0]
          )
        );
        setSelectOptions(documentTypes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentChange =
    (type: keyof documentData) => (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.files);
      if (e.target.files && e.target.files.length) {
        setDocumentFormData({
          ...documentFormData,
          [type]: e.target.files[0],
        });
        setSelectedDocumentPreview(URL.createObjectURL(e.target.files[0]));
      }
    };

  const handleEditImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setDocumentFormData((prevFormData) => ({
        ...prevFormData,
        [selectedDocumentType]: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(undefined);
      setDocumentFormData((prevFormData) => ({
        ...prevFormData,
        [selectedDocumentType]: null,
      }));
    }
    setIsLoading(false);
  };

  const handleUpload = async () => {
    try {
      setUploadButtonLoading(true);
      const formData = new FormData();
      console.log(documentFormData[selectedDocumentType]);

      formData.append("image", documentFormData[selectedDocumentType] as Blob);

      formData.append("type", selectedDocumentType);
      const response = await http.post("api/v1/document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const response = form_http.post("/api/v1/document", formData);
      // console.log(formData);
      // console.log("Upload response:", response.data);
      fetchDocuments();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setUploadButtonLoading(false);
      }, 2000);
    }
  };

  const handleModelOpen = (document) => {
    setPreviewUrl(document.document);
    // console.log(document.id);
    setUpdateId(document.id);
    setModelOpen(true);
  };

  const handleCloseModal = () => {
    setPreviewUrl(undefined);
    setModelOpen(false);
  };
  const handleSaveChanges = async (document: string) => {
    console.log(document);
    try {
      const formData = new FormData();
      formData.append("image", documentFormData[selectedDocumentType] as Blob);
      formData.append("type", selectedDocumentType);

      const response = await form_http.patch(
        `/api/v1/document/update/${document}`,
        formData
      );
      console.log(response.data);
      fetchDocuments();
    } catch (error) {
      console.log(error);
    }
    setModelOpen(false);
  };

  return (
    <>
      <div className="flex flex-row max-md:flex-col max-md:gap-2 w-full h-full max-md:w-full max-md:h-full">
        <div className="w-1/2 h-[400px] max-h-[600px] overflow-auto p-2 max-md:w-full max-md:h-full">
          {!selectOptions.has("Adharcard") ||
          !selectOptions.has("Licence") ||
          !selectOptions.has("Image") ||
          !selectOptions.has("Pancard") ? (
            <>
              <div className="w-full h-full max-h-[400px] max-md:w-full max-md:max-h-full overflow-auto flex justify-center items-center p-3">
                <div className=" w-full h-full border rounded shadow-md">
                  <div className="flex flex-col w-full h-full gap-4 p-2">
                    <div className="flex-1 text-center text-lg font-semibold">
                      Upload Your Document Here
                    </div>
                    {!selectOptions.has("Adharcard") ||
                    !selectOptions.has("Licence") ||
                    !selectOptions.has("Vehicle") ||
                    !selectOptions.has("Pancard") ? (
                      <div className="flex flex-row gap-3  w-full">
                        <div className="w-1/2 flex justify-start p-1 text-center">
                          <label htmlFor="Document Type ">
                            Select your Document
                          </label>
                        </div>
                        <div className="w-1/2 flex justify-end p-1 border border-purple-500">
                          <select
                            name="documentType"
                            id="documentType"
                            value={selectedDocumentType}
                            onChange={(e) =>
                              setSelectedDocumentType(
                                e.target.value as keyof documentData
                              )
                            }
                            className="w-full"
                          >
                            {!selectOptions.has("Adharcard") && (
                              <option value="aadhar">Aadhar Card</option>
                            )}
                            {!selectOptions.has("Licence") && (
                              <option value="licence">Driving Licence</option>
                            )}
                            {!selectOptions.has("Pancard") && (
                              <option value="pancard">Pancard</option>
                            )}
                            {!selectOptions.has("Vehicle") && (
                              <option value="vehicle">Vehicle</option>
                            )}
                          </select>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex flex-row gap-3  w-full ">
                      <div className="w-1/2 flex justify-start p-1 text-center">
                        <label
                          htmlFor="Document Type"
                          // className="text-sm font-medium text-gray-900 "
                        >
                          upload your Document
                        </label>
                      </div>
                      <div className="w-1/2 flex justify-end ">
                        <input
                          type="file"
                          id="documentFile"
                          className="w-full text-gray-500 text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2  file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                          name="documentFile"
                          onChange={handleDocumentChange(selectedDocumentType)}
                        />
                      </div>
                    </div>
                    {/* for image preview */}
                    <div className=" w-full h-full max-md:w-full max-md:h-full">
                      {documentFormData[selectedDocumentType] ? (
                        <>
                          <div className="w-full h-full m-1">
                            <div className="flex flex-row w-full ">
                              <div className="flex-1 border text-center flex justify-center p-3 items-center">
                                <Image
                                  src={selectedDocumentPreview || ""}
                                  width={350}
                                  height={300}
                                  alt="Document Preview"
                                  className="max-h-[150px] max-w-[200px] rounded shadow-md border object-contain"
                                />
                              </div>
                            </div>
                            <div className="flex-1 text-center">
                              <button
                                type="button"
                                className="inline-block rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                onClick={handleUpload}
                              >
                                {uploadButtonLoading ? (
                                  <svg
                                    className="animate-spin h-5 w-5 absolute top-1/2 left-1/2 -mt-2 -ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.042 11H12V4.958c-1.073 0-2.117.215-3.1.635m1.129 14.284A8.003 8.003 0 014.5 16.042M4.958 12H12V20.042a8.003 8.003 0 01-3.1-.635m13.196 1.774a8 8 0 11-11.313 0"
                                    ></path>
                                  </svg>
                                ) : null}
                                Click me
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <hr />
                          <div className=" w-full h-full flex  flex-col justify-center items-center">
                            <figure className="max-w-lg max-h-full flex flex-col">
                              <div className="h-auto max-w-full rounded-lg flex justify-center">
                                <MdOutlineImageNotSupported size={64} />
                              </div>
                              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                Not Uploaded Yet
                              </figcaption>
                            </figure>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full h-full max-h-[600px]  ">
          <div className="p-3 max-h-[600px] overflow-x-auto">
            <table className="table-auto w-full text-sm text-left rounded-lg shadow">
              <thead className="text-xs text-white text-center uppercase bg-[#2967ff] border w-auto sticky">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    Index
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Document Preview
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Document Type
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="rounded w-full ">
                {noTableData ? (
                  <>
                    <tr>
                      <td colSpan={4} className="text-center ">
                        <div className="text-gray-500 h-96 flex flex-col justify-center items-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mb-4 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="w-auto h-12 text-gray-400 text-center mx-auto">
                            No files found
                          </p>
                        </div>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {documents.map((item, index) => (
                      // setNoTableData(false);
                      <>
                        <tr
                          key={item.id}
                          className="border-b text-center w-auto hover:bg-gray-100 transition-all duration-300"
                        >
                          <td className=" border  whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className=" whitespace-nowrap p-2 flex justify-center content-center">
                            <Image
                              src={item.document}
                              width={500}
                              height={500}
                              alt="Document Preview"
                              className="w-44 h-44"
                            />
                          </td>
                          <td className=" border whitespace-nowrap text-center">
                            {item.internal_path.split("/")[0]}
                          </td>
                          <td className="text-center ">
                            <button
                              className="font-medium text-blue-600 text-center "
                              onClick={() => handleModelOpen(item)}
                            >
                              edit
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isModelopen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2>Edit Document</h2>
              <button onClick={handleCloseModal}>Close</button>

              {isloading ? (
                <div className="flex items-center justify-center">
                  loading...
                </div>
              ) : (
                <>
                  {previewUrl && (
                    <Image
                      src={previewUrl || ""}
                      width={500}
                      height={500}
                      alt="Document Preview"
                    />
                  )}
                </>
              )}

              <input type="file" onChange={handleEditImageChange} />
              {/* {
                updatePrivewUrl 
              } */}

              <button onClick={() => handleSaveChanges(updateId)}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DriverDocument;
