import {toastConfig} from "react-simple-toasts";

export function configToast() {
    return toastConfig({theme: "chroma", duration: 1500, position: "top-center", className: "bg-[#675335] text-white rounded-xl p-2"})

}