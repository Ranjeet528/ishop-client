'use client'

import { client, notify } from "@/utils/helper";
import { useRouter } from "next/navigation";

function StatusBtn({ value, id, field }) {
    const router = useRouter();
    function statusHandler() {
       client.patch(`category/status-update/${id}`, { field }).then(
            (response) => {
                notify(response.data.message, response.data.success)
                if (response.data.success) {
                    router.refresh()

                }
            }
        ).catch((error) => {
    const message =
        error?.response?.data?.message ||
        "Internal server error";

    notify(message, false);
})

    };

     const lable ={
        status:["Active","Inactive"],
        Is_home:["Home","Not home"],
        Is_top:["Top","Not Top"],
        Is_popular:["Popular","Not Popular"],
     }
     const [Truelable, Falselable]= lable[field] || {"Yes":"No"};
    
    const base = "px-3 py-2 rounded m-2 full text-sm font-medium";
    const statustrue = "bg-green-200 text-green-600";
    const statusfalse = "bg-red-200 text-red-600";
    return (
        
        <button onClick={statusHandler} className={`${base} ${value ? statustrue : statusfalse}`}>
            {value ? Truelable : Falselable}

        </button>

    );
}
export default StatusBtn;