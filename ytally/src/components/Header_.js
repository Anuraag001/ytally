function Header({showSignIn,setShowSignIn}){
    return (
        <div className={`flex flex-row gap-x-5 justify-around items-center text-zinc-200 text-md font-sans bg-black`}>
            <div className="flex flex-row justify-self-start gap-x-1 text-orange-300"><img src={process.env.PUBLIC_URL + "/youtube.png"} className="object-contain h-7 w-7"></img>YTAlly</div>
            <div className="flex flex-row justify-end gap-x-10">
            <div className="hover:text-green-300 hover:border-b border-white">About</div>
            <div className="hover:text-green-300 hover:border-b border-white">Products</div>
            <div className="hover:text-green-300 hover:border-b border-white">Contact</div>
            </div>
            <div className="flex flex-row gap-x-5 ">
                <div className="hover:text-green-300 hover:border border-white px-1" onClick={()=>{setShowSignIn(true)}}>SignIn</div>
                <div className="hover:text-green-300 hover:border border-white px-1" onClick={()=>{setShowSignIn(false)}}>Signup</div>
            </div>
        </div>
    )
}

export default Header;

// ${showSignIn ? 'blur-sm' : 'blur-none'}