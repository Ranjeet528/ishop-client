'use client'

import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';


function DeleteBtn({ API }) {
    const router = useRouter();
    function deleteHandler() {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                })
                 client.delete(API).then(
            (response) => {
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    router.refresh()

                }
            }
        ).catch(
            (error) => {

                const message = error?.response?.message || "Internal servar error";
                notify(message, false);


            }

        )
            };

        });
       




    };



    const base = "px-3 py-2 rounded m-2 full text-sm font-medium";
    return (
        <button onClick={deleteHandler} className="p-2 bg-red-100 text-red-600 rounded">
            <FaTrash />
        </button>

    );
}
export default DeleteBtn;