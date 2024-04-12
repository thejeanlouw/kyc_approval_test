// "use client"

// import { useState } from "react"
// import { useSession } from "next-auth/react"

// export default function UploadForm() {
//   const { data: session } = useSession()
//   const [file, setFile] = useState(null as any | null)
//   const [docType, setDocType] = useState(null as any | null)
//   const [docSubtype, setDocSubtype] = useState(null as any | null)

//   async function handleSubmit(e: any) {
//     e.preventDefault()

//     const metadata = {
//       path: `{project_env}/{country}/{doc_type}/${docSubtype}/${session?.user}`,
//       doc_type: docType,
//       doc_subtype: docSubtype,
//       userID: session?.user,
//     }

//     const formData = new FormData()
//     if (file) formData.append("file", file)
//     formData.append("metadata", JSON.stringify(metadata))

//     await fetch("/api/documents/upload", {
//       method: "POST",
//       body: formData,
//     })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={(e) => setFile(e.target?.files ? e.target?.files[0] : null)} />
//       <input
//         type="text"
//         placeholder="Document Type"
//         value={docType}
//         onChange={(e) => setDocType(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Document Subtype"
//         value={docSubtype}
//         onChange={(e) => setDocSubtype(e.target.value)}
//       />
//       <button type="submit">Upload</button>
//     </form>
//   )
// }