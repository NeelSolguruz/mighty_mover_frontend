import React, { ChangeEvent, useEffect, useState } from "react";
import http from "@/http/http";
import Image from "next/image";
import InfoSvg from "@/assets/Images/icons/infoSvg";
import { documentData } from "@/constant/type/data.type";
import form_http from "@/http/formHttp";

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
  // const [updatePrivewUrl, setUpdatePrivewUrl] = useState<string | undefined>(undefined);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<keyof documentData>("aadhar");

  const [documentFormData, setDocumentFormData] = useState<documentData>({
    aadhar: null,
    licence: null,
    pancard: null,
    image: null,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await http.get("api/v1/document");
      setDocuments(response.data.data);
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
      const formData = new FormData();
      console.log(documentFormData[selectedDocumentType]);

      formData.append("image", documentFormData[selectedDocumentType] as Blob);

      formData.append("type", selectedDocumentType);
      // const response = await http.post("api/v1/document", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = form_http.post("/api/v1/document", formData);
      console.log(formData);
      // console.log("Upload response:", response.data);
      fetchDocuments();
    } catch (error) {
      console.log(error);
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
      <div className="flex flex-col gap-4 w-full h-auto">
        <div>
          <table className="table-auto w-full text-sm text-left">
            <thead className="text-xs text-white text-center uppercase bg-[#2967ff] border w-auto ">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Index
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Document Type
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Upload Documnet
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Document Preview
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center border">1</td>
                <td className="text-center border">
                  <select
                    name="documentType"
                    id="documentType"
                    value={selectedDocumentType}
                    onChange={(e) =>
                      setSelectedDocumentType(
                        e.target.value as keyof documentData
                      )
                    }
                  >
                    <option value="aadhar">Aadhar Card</option>
                    <option value="licence">Driving licence</option>
                    <option value="pancard">Pancard</option>
                    <option value="image">Image</option>
                  </select>
                </td>
                <td className="text-center border">
                  <input
                    type="file"
                    id="documentFile"
                    name="documentFile"
                    onChange={handleDocumentChange(selectedDocumentType)}
                  />
                </td>
                <td className=" border whitespace-nowrap p-3 flex justify-center content-center">
                  {documentFormData[selectedDocumentType] && (
                    <Image
                      src={selectedDocumentPreview || ""}
                      width={500}
                      height={500}
                      alt="Document Preview"
                      className="w-44 h-44"
                    />
                  )}
                </td>
                <td className="text-center border">
                  <button onClick={handleUpload}>Upload</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-w-full max-h-[200px] overflow-auto ">
          <table className="table-auto w-full text-sm text-left ">
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
            <tbody>
              {documents.map((item, index) => (
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
              ))}
            </tbody>
          </table>
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
