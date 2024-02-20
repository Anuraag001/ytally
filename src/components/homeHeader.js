function HomeHead(){
    return (
        <div className="flex flex-row gap-x-5 justify-between items-center text-zinc-200 text-lg font-sans m-2">
            <div className="flex flex-row justify-self-start gap-x-1 text-orange-300"><img src={process.env.PUBLIC_URL + "/youtube.png"} className="object-contain h-7 w-7"></img>YTAlly</div>
            <div className="flex flex-row justify-end gap-x-10">
            <img className="object-contain h-8 w-8 rounded-full border-2 border-stone-950" src={process.env.PUBLIC_URL + "/editors.png"}></img>
            <img className="object-contain h-8 w-8 rounded-full border-2 border-stone-950" src={process.env.PUBLIC_URL + "/messages.png"}></img>
            <div className="flex flex-row gap-2">
                <img className="object-contain h-8 w-8" src={process.env.PUBLIC_URL + "/profile.png"}></img>
                <div className="flex flex-col text-xs text-orange-300">
                    <div>firstname lastname</div>
                    <div>emailID</div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default HomeHead;