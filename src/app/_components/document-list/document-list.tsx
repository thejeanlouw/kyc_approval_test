import { trpc } from "@/app/_trpc/client"
import Link from "next/link";

import { Client } from '@microsoft/microsoft-graph-client';
import { debug } from "console";



export default function DocumentList(req:any) {
  const { data: documents, refetch } = trpc.getDocuments.useQuery();
  const addDocument = trpc.addDocument.useMutation({
    onSuccess: () => {
      // Invalidate and refetch the documents query to update the list
      refetch();
    },
  });
  const deleteDocument = trpc.deleteDocument.useMutation({
    onSuccess: () => {
      // Invalidate and refetch the documents query to update the list
      refetch();
    },
  });


  const handleDocumentDelete = async (id: number) => {
    await deleteDocument.mutateAsync({ id });
  }

  const handleDocumentChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected', e.target.files);
      return;
    }
    console.log('Uploading file', file);
  
    const metadata = {
      // Add any relevant metadata here
    };
  
    await uploadHandler(file, metadata);
  };
  
  
  const uploadHandler = async (file: File, metadata: any) => {

    const client = Client.init({
      authProvider: (done) => {
        done(null, 'Bearer ' + req.session.accessToken);
      }
    });
    
    try {
      debugger
      const uploadedFile = await client.api('/me/drive/root/children').post({
        name: file.name,
        file: file,
      });
  
      const oneDrivePath = uploadedFile.webUrl;
      const sharePointUrl = uploadedFile.webUrl; // Modify this based on your SharePoint URL structure
  
      await addDocument.mutateAsync({
            name: file.name,
            webUrl: sharePointUrl,
            createdDateTime: uploadedFile.createdDateTime,
            lastModifiedDateTime: uploadedFile.lastModifiedDateTime,
            createdByUser: uploadedFile.createdBy.user.displayName,
            lastModifiedByUser: uploadedFile.lastModifiedBy.user.displayName,
            size: uploadedFile.size,
            file: oneDrivePath,
            folder: 'root',
            metadata: JSON.stringify(metadata),
            documentId: uploadedFile.id,
          });
      
          console.log('File uploaded and database updated');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
  
      const { name, content } = req.body;
  
      try {
        const uploadedFile = await client.api('/me/drive/root/children').post({
          name,
          file: content,
        });
    
        console.log('uploadedFile', uploadedFile);
      } catch (error) {
        console.error('Error uploading file:', error);
        
      }
      
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Document</h1>
      <p className="mb-4">Upload document to OneDrive and capture metadata</p>
      <hr className="my-4" />
      <input type="file" onChange={handleDocumentChange} className="mb-4" />
      <hr className="my-4" />

      <h1 className="text-2xl font-bold mb-4">Documents</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-left">Metadata</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {documents?.map((doc:any) => (
              <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{doc.name}</td>
                <td className="py-3 px-6 text-left">
                  <Link href={String(doc.webUrl)} className="text-blue-500 hover:underline">
                    {doc.webUrl}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">
                  <pre className="text-xs">{JSON.stringify(doc, null, 2)}</pre>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDocumentDelete(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}