import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context:NextPageContext)
{
    const session =await getSession(context);
    if(!session)
    {
        return{
            redirect:{
                destination:'/auth',
                permanent:false
            }
        }
    }
    return{
        props:{}
    }
}
export default function Profiles(){
    const router=useRouter();
    const {data:user} = useCurrentUser();
    return(
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={()=>{router.push('/')}} className="group cursor-pointer transition hover:opacity-75">
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                            w-44
                            h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover:cursor-pointer
                            group-hover:border-white
                            overflow-hidden

                            ">
                                <Image 
                                width={160}
                                height={160}
                                alt="Profile"
                                src={"/images/default-blue.png"}>

                                </Image>

                            </div>
                            <div className="mt-4 text-gray-400 text-sm text-center group-hover:text-white">
                                {user?.name}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}