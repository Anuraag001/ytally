function Header(){
    return (
        <div className="flex flex-row gap-x-5 justify-between items-center text-zinc-200 text-lg font-sans">
            <div className="flex flex-row justify-self-start gap-x-1 text-orange-300"><img src={process.env.PUBLIC_URL + "/youtube.png"} className="object-contain h-7 w-7"></img>YTAlly</div>
            <div className="flex flex-row justify-end gap-x-10">
            <div className="hover:text-green-300">About</div>
            <div className="hover:text-green-300">Products</div>
            <div className="hover:text-green-300">Contact</div>
            <div className="hover:text-green-300 rounded-md px-1 border-2 border-white">Create Account</div>
            </div>
        </div>
    )
}

export default Header;