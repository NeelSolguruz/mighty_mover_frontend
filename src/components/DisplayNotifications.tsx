import http from "@/http/http";
import { useEffect, useState } from "react";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import Loader from "react-js-loader";
import { formatDistanceToNow, parseISO } from 'date-fns';


export default function DisplayNotifications() {
    useEffect(() => {
        fetchNotifications();
    }, [])

    const [loading, setLoading] = useState<boolean>(false)

    const [allNotifications, setAllNotifications] = useState([])
    const [date, setDate] = useState<string>('')

    const fetchNotifications = async () => {
        setLoading(true)
        try {
            const response = await http.get('/api/v1/notifications');
            setAllNotifications(response.data.data);
            setLoading(false)
            console.log(response.data.data)
        } catch (error) {
            console.error("Couldn't fetch notifications", error)
        }
    }

    const deleteSingleNotification = async (id: string) => {
        try {
            http.delete(`/api/v1/notifications/${id}`)
            // fetchNotifications();
            setAllNotifications(prevNotifications =>
                prevNotifications.filter(notification => notification.id !== id)
            );
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader
                        type="spinner-default"
                        bgColor={"black"}
                        color={"black"}
                        size={50}
                    />
                </div>

            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl py-2 font-bold border-b border-black w-full text-center">Notifications</h1 >
                    {
                        allNotifications.length !== 0 ? (
                            <div className="py-2">
                                {allNotifications?.map((item, index) => (
                                    <div key={index} className="hover:bg-gray-100 flex p-2">
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <p className="text-xs">{new Date(item.created_at).toLocaleTimeString()}</p>
                                                </div>
                                                <p className="text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-sm text-gray-700">{item.description}</p>
                                        </div>
                                        <button className="active:text-gray-500" onClick={() => deleteSingleNotification(item.id)}>
                                            <RxCross2 className="size-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 py-2">
                                <div className="flex justify-center">
                                    <IoNotificationsOffOutline className="size-6/12" />
                                </div>
                                <p className="font-semibold text-lg">NO NOTIFICATIONS</p>
                            </div>
                        )
                    }
                </div >
            )}
        </>
    )
}